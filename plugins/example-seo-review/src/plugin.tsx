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
  // expandSeoReview,
} from './utils';
import axios from 'axios';
import { method, result } from 'lodash';
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import React from 'react';

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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
  };
  imageAnalysis?: {
    numberOfImages?: number;
    imageNameContainsKeyword?: number;
    imageAltTagContainsKeyword?: number;
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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
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
    maxSeoScoreAvailable?: number;
    seoScore?: number;
  };
}

// Creates a modal popup with data
interface ApplicationContext {
  globalState: {
    // const modal = appState.globalState.openDialog(
    //   <div onClick={() => modal()}>
    //     I am a modal!
    //   </div>
    // )
    openDialog(element: JSX.Element): Promise<() => void>;
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

            const result = (await response.json()).data as seoAPIdata;

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

        let seoAPIDataFormatted: any = await fetchSeoData();
        seoAPIDataFormatted = formatSeoData(seoAPIDataFormatted);

        function formatSeoData(data: any) {
          let formattedData = {
            overview: {
              keyword: data.Overview.Keyword,
              overallSeoScore: data.Overview['Overall SEO score'],
              availableSeoPoints: data.Overview['Available SEO points'],
              earnedSeoPoints: data.Overview['Earned SEO points'],
              summary: {
                errors: data.Overview.Summary.Errors,
                warnings: data.Overview.Summary.Warnings,
                optimized: data.Overview.Summary.Optimized,
              },
            },
            titleTag: {
              Result: data['Title tag'].Result,
              titleFound: data['Title tag']['Title found'],
              inputUrl: data['Title tag']['Input URL'],
              titleTag: data['Title tag']['Title tag'],
              titleLength: data['Title tag']['Title length'],
              titleTagNumber: data['Title tag']['title tag number'],
              focusKeywordsPosition: data['Title tag']['Focus keywords position'],
              focusKeywordsFound: data['Title tag']['Focus keywords found'],
              keyword: data['Title tag'].Keyword,
              feedbackDetails: {
                found: {
                  text: data['Title tag']['Feedback details'].Found.text,
                  class: data['Title tag']['Feedback details'].Found.class,
                },
                length: {
                  text: data['Title tag']['Feedback details'].Length.text,
                  class: data['Title tag']['Feedback details'].Length.class,
                },
                focusKeyword: {
                  text: data['Title tag']['Feedback details']['Focus keyword'].text,
                  class: data['Title tag']['Feedback details']['Focus keyword'].class,
                },
                focusKeywordsPosition: {
                  text: data['Title tag']['Feedback details']['Focus keywords position'].text,
                  class: data['Title tag']['Feedback details']['Focus keywords position'].class,
                },
              },
              maxSeoScoreAvailable: data['Title tag']['Max SEO score available'],
              seoScore: data['Title tag']['SEO Score'],
            },
            metaDescription: {
              result: data['Meta description'].Result,
              metaDescriptionFound: data['Meta description']['Meta description found'],
              inputUrl: data['Meta description']['Input URL'],
              metaDescription: data['Meta description']['Meta description'],
              metaDescriptionLength: data['Meta description']['Meta description length'],
              metaDescriptionNumber: data['Meta description']['meta description number'],
              focusKeywordsPosition: data['Meta description']['Focus keywords position'],
              focusKeywordsFound: data['Meta description']['Focus keywords found'],
              keyword: data['Meta description'].Keyword,
              feedbackDetails: {
                found: {
                  text: data['Meta description']['Feedback details'].Found.text,
                  class: data['Meta description']['Feedback details'].Found.class,
                },
                length: {
                  text: data['Meta description']['Feedback details'].Length.text,
                  class: data['Meta description']['Feedback details'].Length.class,
                },
                focusKeyword: {
                  text: data['Meta description']['Feedback details']['Focus keyword'].text,
                  class: data['Meta description']['Feedback details']['Focus keyword'].class,
                },
                focusKeywordsPosition: {
                  text:
                    data['Meta description']['Feedback details']['Focus keywords position'].text,
                  class:
                    data['Meta description']['Feedback details']['Focus keywords position'].class,
                },
              },
              maxSeoScoreAvailable: data['Meta description']['Max SEO score available'],
              seoScore: data['Meta description']['SEO Score'],
            },
            pageHeadingsSummary: {
              h1: data['Page Headings summary'].H1,
              h2: data['Page Headings summary'].H2,
              h3: data['Page Headings summary'].H3,
              h4: data['Page Headings summary'].H4,
              h5: data['Page Headings summary'].H5,
              h6: data['Page Headings summary'].H6,
              h1Count: data['Page Headings summary']['H1 count'],
              h1Content: data['Page Headings summary']['H1 Content'],
              focusKeywordsFound: data['Page Headings summary']['Focus keywords found'],
              keyword: data['Page Headings summary'].Keyword,
              feedbackDetails: {
                notFound: {
                  text: data['Page Headings summary']['Feedback details']['Not found'].text,
                  class: data['Page Headings summary']['Feedback details']['Not found'].class,
                },
                focusKeyword: {
                  text: data['Page Headings summary']['Feedback details']['Focus keyword'].text,
                  class: data['Page Headings summary']['Feedback details']['Focus keyword'].class,
                },
              },
              maxSeoScoreAvailable: data['Page Headings summary']['Max SEO score available'],
              seoScore: data['Page Headings summary']['SEO Score'],
            },
            wordCount: {
              inputUrl: data['Word count']['Input URL'],
              wordCountTotal: data['Word count']['Word count total'],
              correctedWordCount: data['Word count']['Corrected word count'],
              anchorTextWords: data['Word count']['Anchor text words'],
              anchorPercentage: data['Word count']['Anchor Percentage'],
              feedbackDetails: {
                found: {
                  text: data['Word count']['Feedback details']['Found'].text,
                  class: data['Word count']['Feedback details']['Found'].class,
                },
              },
              maxSeoScoreAvailable: data['Word count']['Max SEO score available'],
              seoScore: data['Word count']['SEO Score'],
            },
            onPageLinksSummary: {
              totalLinks: data['On page links summary']['Total links'],
              externalLinks: data['On page links summary']['External links'],
              internalLinks: data['On page links summary']['Internal'],
              noFollowCount: data['On page links summary']['Nofollow count'],
              duplicateLinks: data['On page links summary']['Duplicate links'],
              noAltTag: data['On page links summary']['No alt tag'],
              feedbackDetails: {
                found: {
                  text: data['On page links summary']['Feedback details']['Found'].text,
                  class: data['On page links summary']['Feedback details']['Found'].class,
                },
              },
              maxSeoScoreAvailable: data['On page links summary']['Max SEO score available'],
              seoScore: data['On page links summary']['SEO Score'],
            },
            imageAnalysis: {
              numberOfImages: data['Image analysis']['Number of images'],
              imageNameContainsKeyword: data['Image analysis']['Image name contains keyword'],
              imageAltTagContainsKeyword: data['Image analysis']['Image ALT tag contains keyword'],
              keyword: data['Image analysis'].Keyword,
              feedbackDetails: {
                found: {
                  text: data['Image analysis']['Feedback details']['Found'].text,
                  class: data['Image analysis']['Feedback details']['Found'].class,
                },
                imageNameContainsKeyword: {
                  text:
                    data['Image analysis']['Feedback details']['Image name contains keyword'].text,
                  class:
                    data['Image analysis']['Feedback details']['Image name contains keyword'].class,
                },
                imageAltTagContainsKeyword: {
                  text:
                    data['Image analysis']['Feedback details']['Image ALT tag contains keyword']
                      .text,
                  class:
                    data['Image analysis']['Feedback details']['Image ALT tag contains keyword']
                      .class,
                },
              },
              maxSeoScoreAvailable: data['Image analysis']['Max SEO score available'],
              seoScore: data['Image analysis']['SEO Score'],
            },
            keywordDensity: {
              keyword: data['Keyword density'].Keyword,
              keywordDensity: data['Keyword density']['Keyword density'],
              feedbackDetails: {
                found: {
                  text: data['Keyword density']['Feedback details']['Found'].text,
                  class: data['Keyword density']['Feedback details']['Found'].class,
                },
              },
              maxSeoScoreAvailable: data['Keyword density']['Max SEO score available'],
              seoScore: data['Keyword density']['SEO Score'],
            },
          };

          return formattedData;
        }

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
          name: `Data entry for seo review on content ${content.id}`,
          meta: {
            createdBy: pkg.name,
          },
          data: seoAPIDataFormatted,
        });

        // const expandSeoReview = await appState.createContent(seoReviewModel.name, {
        //   name: `Expanded SEO Results ${content.id}`,
        //   meta: {
        //     createdBy: pkg.name,
        //   },
        //   data: seoAPIDataFormatted,
        // });

        showReviewNotifications(seoReviewEntry.id);
        // expandSeoReview(expandSeoReview.id);
      },
    });

    return {};
  }
);
