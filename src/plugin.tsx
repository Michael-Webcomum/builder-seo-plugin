import { registerCommercePlugin as registerPlugin } from '@builder.io/commerce-plugin-tools';
import pkg from '../package.json';
import appState from '@builder.io/app-context';
import {
  getSEOReviewModel,
  getSEOReviewModelTemplate,
  registerContentAction,
  showReviewNotifications,
  fastClone,
  expandSeoReview,
} from './utils';
import { prepareSeoData } from './prepareSeoData';

/**
 * Instruct builder to require few settings before running the plugin code, for example when an apiKey for the service is required
 */
registerPlugin(
  {
    name: 'SEOReview',
    id: pkg.name,
    settings: [
      {
        name: 'apiKey',
        type: 'string',
        helperText: 'get the api key from your builder.io account settings',
        required: true,
      },
    ],
    // Builder will notify plugin user to configure the settings above, and call this function when it's filled
    onSave: async actions => {
      // adds a new model, only once when the user has added their api key
      if (!getSEOReviewModel()) {
        actions.addModel(getSEOReviewModelTemplate());
      }
    },
    ctaText: `Connect using your API key`,
  },
  // settings is a map of the settings fields above
  async settings => {
    // press the vertical dots in the content editor to see this in action
    registerContentAction({
      label: 'Request SEO Review',
      showIf(content, model) {
        console.log('plugin: in Request SEO Review content action showIf', content, model);
        // content is the current content object in editor
        // model is the current model in editor
        return model.kind === 'page';
      },
      async onClick(content) {
        const seoReviewModel = getSEOReviewModel();
        const seoReviewsApiKey = settings.get('apiKey');

        console.log('plugin: clicked action, the user entered api key is ', seoReviewsApiKey);

        // Data is prepared to have the same structure as Builder.io expects
        let seoAPIDataFormatted: any = await prepareSeoData();

        // adds the result to the latest draft
        await appState.updateLatestDraft({
          id: content.id,
          modelId: content.modelId,
          data: {
            ...fastClone(content.data),
            ...seoAPIDataFormatted,
          },
        });

        // example for saving the result of seo review in a builder data model, for easier retrieval
        const seoReviewEntry = await appState.createContent(seoReviewModel.name, {
          name: `Data entry for SEO review on content ${content.id}`,
          meta: {
            createdBy: pkg.name,
          },
          data: seoAPIDataFormatted,
        });

        //Display notification of review completion
        showReviewNotifications(seoReviewEntry.id);
        //Displays modal/popup with detailed and visualised data
        expandSeoReview(seoAPIDataFormatted);
      },
    });

    return {};
  }
);
