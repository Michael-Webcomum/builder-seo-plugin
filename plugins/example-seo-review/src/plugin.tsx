import { registerCommercePlugin as registerPlugin } from '@builder.io/commerce-plugin-tools';
import pkg from '../package.json';
import appState from '@builder.io/app-context';
import {
  getSEOReviewModel,
  getSEOReviewModelTemplate,
  registerContentAction,
  getIframeHTMLContent,
  showReviewNotifications,
  fastClone,
} from './utils';
import axios from 'axios';
import { method } from 'lodash';

interface seoAPIdata {
  Overview?: {
    keyword?: string;
    overallSEOScore?: number;
    availableSEOPoints?: number;
    earnedSEOPoints?: number;
    summary?: {
      errors?: number;
      warnings?: number;
      optimized?: number;
    };
  };
  titleTag?: {
    Result?: number;
    titleFound?: string;
    inputUrl?: string;
    titleTag?: string;
    titleLength?: number;
    titleTagNumber?: number;
    focusKeywordsPosition?: number;
    focusKeywordsFound?: number;
    keyword?: string;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
      length?: {
        text?: string;
        class?: string;
      };
      focusKeyword?: {
        text?: string;
        class?: string;
      };
      focusKeywordsPosition?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
  metaDescription?: {
    result?: number;
    metaDescriptionFound?: string;
    inputUrl?: string;
    metaDescription?: string;
    metaDescriptionNumber?: number;
    // focusKeywordsPosition?: number;
    focusKeywordsFound?: number;
    keyword?: string;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
      length?: {
        text?: string;
        class?: string;
      };
      focusKeyword?: {
        text?: string;
        class?: string;
      };
      focusKeywordsPosition?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
  pageHeadingsSummary?: {
    h1?: number;
    h2?: number;
    h3?: number;
    h4?: number;
    h5?: number;
    h6?: number;
    h1Count?: number;
    h1Content?: string;
    focusKeywordsFound?: number;
    keyword?: string;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
      focusKeyword?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
  wordCount?: {
    inputUrl?: string;
    wordCountTotal?: string;
    correctedWordCount?: string;
    anchorTextWords?: string;
    anchorPercentage?: string;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
  onPageLinksSummary?: {
    totalLinks?: number;
    externalLinks?: number;
    internalLinks?: number;
    noFollowCount?: number;
    duplicateLinks?: number;
    noAltTag?: number;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
  imageAnalysis?: {
    numberOfImages?: number;
    imageNameContainsKeyword?: number;
    imageAltContainsKeyword?: number;
    keyword?: string;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
      imageNameContainsKeyword?: {
        text?: string;
        class?: string;
      };
      imageAltTagContainsKeyword?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
  keywordDensity?: {
    result?: number;
    keyword?: string;
    keywordType?: string;
    frequency?: number;
    keywordDensity?: number;
    feedbackDetails?: {
      found?: {
        text?: string;
        class?: string;
      };
    };
    maxSEOScoreAvailable?: number;
    SEOScore?: number;
  };
}

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

        async function fetchSeoData() {
          const keyword = await appState.dialogs.prompt({
            placeholderText: 'Enter a keyword to test',
          });
          const baseURL = `https://api.seoreviewtools.com/seo-content-analysis/`;
          const apiKey = 'as-sdf-fvhgffdgjkh87349hlm768';

          const iframeHTMLContent = await getIframeHTMLContent();
          console.log('plugin: iframeHTMLContent', iframeHTMLContent);

          try {
            const response = await fetch(`${baseURL}?content=1&keyword=${keyword}&key=${apiKey}`, {
              method: 'POST',
              body: JSON.stringify({
                data: iframeHTMLContent,
              }),
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }

            const result = (await response.json()) as seoAPIdata;
            console.log('result is: ', JSON.stringify(result, null, 2));
            return result;
          } catch (error) {
            if (error instanceof Error) {
              console.log('error message', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred;';
            }
          }
        }

        fetchSeoData();

        // fake seo review result
        const seoReviewResult = {
          title: 'Johnson',
          description: 'paulo likes francesinha',
          keywords: ['hello', 'world'],
        };

        // Real SEO Review Results
        const mySeoAPIdata: seoAPIdata = {
          Overview: {},
          titleTag: {},
          metaDescription: {},
          pageHeadingsSummary: {},
          wordCount: {},
          onPageLinksSummary: {},
          imageAnalysis: {},
          keywordDensity: {},
        };

        // Public API fake results
        const beerResults = {
          name: 'Buzz',
          tagline: 'A Real Bitter Experience.',
          first_brewed: '09/2007',
          food_pairing: [
            'Spicy chicken tikka masala',
            'Grilled chicken quesadilla',
            'Caramel toffee cake',
          ],
          brewers_tips:
            'The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.',
        };

        // adds the result to the latest draft
        await appState.updateLatestDraft({
          id: content.id,
          modelId: content.modelId,
          data: {
            ...fastClone(content.data),
            ...mySeoAPIdata,
            // ...seoReviewResult,
            // ...beerResults,
          },
        });

        // example for saving the result of seo review in a builder data model, for easier retrieval
        const seoReviewEntry = await appState.createContent(seoReviewModel.name, {
          name: `Data entry for seo review on content ${content.id}`,
          meta: {
            createdBy: pkg.name,
          },
          data: {
            Overview: mySeoAPIdata.Overview,
            // title: seoReviewResult.title,
            // description: seoReviewResult.description,
            // name: beerResults.name,
            // tagline: beerResults.tagline,
            // first_brewed: beerResults.first_brewed,
            // food_pairing: beerResults.food_pairing,
            // brewers_tips: beerResults.brewers_tips,
          },
        });

        showReviewNotifications(seoReviewEntry.id);
      },
    });

    return {};
  }
);
