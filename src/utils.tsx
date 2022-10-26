import React from 'react';
import { css } from '@emotion/core';
import appState, { globalState } from '@builder.io/app-context';
import { Builder } from '@builder.io/react';
import { Button, Typography, Modal } from '@material-ui/core';
import { formatSeoData } from './formatSeoData';

export const registerContentAction = (contentAction: {
  label: string;
  showIf(content: any, model: any): Boolean;
  onClick(content: any): Promise<void>;
}) => {
  Builder.register('content.action', contentAction);
};

export const fastClone = (obj: any) =>
  obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));

export const seoReviewModelName = 'seo-review-history';
export const getSEOReviewModel = () =>
  appState.models.result.find((m: any) => m.name === seoReviewModelName);
export const getSEOReviewModelTemplate = () => ({
  '@version': 2,
  name: seoReviewModelName,
  kind: 'data' as const,
  subType: '',
  schema: {},
  publishText: 'Authorize',
  unPublishText: 'Cancel',
  fields: [
    {
      '@type': '@builder.io/core:Field',
      name: 'description',
      type: 'text',
      required: false,
      helperText: 'Example field',
    },
  ],
  helperText: 'Seo Reviews History',
  publicWritable: false,
  publicReadable: false,
  strictPrivateRead: true,
  strictPrivateWrite: false,
  showMetrics: false,
  showAbTests: false,
  showTargeting: false,
  showScheduling: false,
  hideFromUI: false,
});

//Displays popup confirming the review has been completed and provides path to review details.
export const showReviewNotifications = (jobId: string) => {
  appState.snackBar.show(
    <div css={{ display: 'flex', alignItems: 'center' }}>Done!</div>,
    100000,
    <Button
      color="primary"
      css={{
        pointerEvents: 'auto',
        ...(appState.document.small && {
          width: 'calc(100vw - 90px)',
          marginRight: 45,
          marginTop: 10,
          marginBottom: 10,
        }),
      }}
      variant="contained"
      onClick={async () => {
        appState.location.go(`/content/${jobId}`);
        appState.snackBar.open = false;
      }}
    >
      Go to review details
    </Button>
  );
};
//Modal/Popup function with visualised data
export const expandSeoReview = (dataToFormat: any) => {
  const data = formatSeoData(dataToFormat);

  appState.globalState.openDialog(
    <div style={modalStyles}>
      <div style={modalTitle}>SEO Review Results</div>
      <div style={modalText}>
        <div style={subTitles}>Overview:</div>

        <div style={spanTag}>
          Keyword <span>{data.overview.keyword}</span>
        </div>

        <div style={pbwrapper}>
          <div>Overall SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>{data.overview.overallSeoScore}/100</div>
          </div>
        </div>

        <div style={spanTag}>
          Available SEO Points <span>{data.overview.availableSeoPoints}</span>
        </div>

        <div style={pbwrapper}>
          <div>Earned SEO Points</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.overview.earnedSeoPoints}/{data.overview.availableSeoPoints}
            </div>
          </div>
        </div>

        <div>
          <div style={feedbackDetailTitle}>Summary: </div>
          <div style={feedbackDetails}>
            <div style={spanTag}>
              <span>
                Errors - {data.overview.summary.errors}
                <span style={summaryDotRed}></span>
              </span>
              <span>
                Warnings - {data.overview.summary.warnings}
                <span style={summaryDotYellow}></span>
              </span>
              <span>
                Optimized - {data.overview.summary.optimized}
                <span style={summaryDotGreen}></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>Title Tag:</div>

        <div style={spanTag}>
          Result <span>{data.titleTag.Result}</span>
        </div>
        <div style={spanTag}>
          Title Found <span>{data.titleTag.titleFound}</span>
        </div>
        <div style={spanTag}>
          Input URL <span>{data.titleTag.inputUrl}</span>
        </div>
        <div style={spanTag}>
          Title Tag <span>{data.titleTag.titleTag}</span>
        </div>
        <div style={spanTag}>
          Title Length <span>{data.titleTag.titleLength}</span>
        </div>
        <div style={spanTag}>
          Title Tag Number <span>{data.titleTag.titleTagNumber}</span>
        </div>
        <div style={spanTag}>
          Focus Keywords Position <span>{data.titleTag.focusKeywordsPosition}</span>
        </div>
        <div style={spanTag}>
          Focus Keywords Found <span>{data.titleTag.focusKeywordsFound}</span>
        </div>
        <div style={spanTag}>
          Keyword <span>{data.titleTag.keyword}</span>
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>
              {data.titleTag.feedbackDetails.found.text ==
              data.titleTag.feedbackDetails.found.text ? (
                <div>Title Tag Not Found</div>
              ) : (
                <div>Found: {data.titleTag.feedbackDetails.found.text}</div>
              )}
            </div>
            <div style={feedbackDetailExtra}>
              <p>{data.titleTag.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.titleTag.feedbackDetails.found.class}
                {data.titleTag.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Length:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.titleTag.feedbackDetails.length.text}</p>
              <p>
                Positive or Negative? - {data.titleTag.feedbackDetails.length.class}
                {data.titleTag.feedbackDetails.length.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.titleTag.feedbackDetails.focusKeyword.text}</p>
              <p>
                Positive or Negative? - {data.titleTag.feedbackDetails.focusKeyword.class}
                {data.titleTag.feedbackDetails.focusKeyword.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword Position:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.titleTag.feedbackDetails.focusKeywordsPosition.text}</p>
              <p>
                Positive or Negative? - {data.titleTag.feedbackDetails.focusKeywordsPosition.class}
                {data.titleTag.feedbackDetails.focusKeywordsPosition.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.titleTag.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.titleTag.seoScore}/{data.titleTag.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>Meta Description:</div>
        <div style={spanTag}>
          Result <span>{data.metaDescription.result}</span>
        </div>
        <div style={spanTag}>
          Meta Description Found
          <span>{data.metaDescription.metaDescriptionFound}</span>
        </div>
        <div style={spanTag}>
          Meta Description <span>{data.metaDescription.metaDescription}</span>
        </div>
        <div style={spanTag}>
          Meta Description Length <span>{data.metaDescription.metaDescriptionLength}</span>
        </div>
        <div style={spanTag}>
          Meta Description Number <span>{data.metaDescription.metaDescriptionNumber}</span>
        </div>
        <div style={spanTag}>
          Focus Keywords Position <span>{data.metaDescription.focusKeywordsPosition}</span>
        </div>
        <div style={spanTag}>
          Focus Keywords Found <span>{data.metaDescription.focusKeywordsPosition}</span>
        </div>
        <div style={spanTag}>
          Keyword <span>{data.metaDescription.keyword}</span>
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>
              {data.metaDescription.feedbackDetails.found.text ==
              data.metaDescription.feedbackDetails.found.text ? (
                <div>Meta Description Not Found</div>
              ) : (
                <div>Found: {data.titleTag.feedbackDetails.found.text}</div>
              )}
            </div>
            <div style={feedbackDetailExtra}>
              <p>{data.metaDescription.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.metaDescription.feedbackDetails.found.class}
                {data.metaDescription.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Length:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.metaDescription.feedbackDetails.length.text}</p>
              <p>
                Positive or Negative? - {data.metaDescription.feedbackDetails.length.class}
                {data.metaDescription.feedbackDetails.length.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.metaDescription.feedbackDetails.focusKeyword.text}</p>
              <p>
                Positive or Negative? - {data.metaDescription.feedbackDetails.focusKeyword.class}
                {data.metaDescription.feedbackDetails.focusKeyword.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keywords Position:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.metaDescription.feedbackDetails.focusKeywordsPosition.text}</p>
              <p>
                Positive or Negative? -{' '}
                {data.metaDescription.feedbackDetails.focusKeywordsPosition.class}
                {data.metaDescription.feedbackDetails.focusKeywordsPosition.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.metaDescription.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.metaDescription.seoScore}/{data.metaDescription.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>Page Headings Summary:</div>
        <div style={spanTag}>
          Result <span>{data.metaDescription.result}</span>
        </div>
        <div style={spanTag}>
          H1 <span>{data.pageHeadingsSummary.h1}</span>
        </div>
        <div style={spanTag}>
          H2 <span>{data.pageHeadingsSummary.h2}</span>{' '}
        </div>
        <div style={spanTag}>
          H3 <span>{data.pageHeadingsSummary.h3}</span>{' '}
        </div>
        <div style={spanTag}>
          H4 <span>{data.pageHeadingsSummary.h4}</span>{' '}
        </div>
        <div style={spanTag}>
          H5 <span>{data.pageHeadingsSummary.h5}</span>{' '}
        </div>
        <div style={spanTag}>
          H6 <span>{data.pageHeadingsSummary.h6}</span>{' '}
        </div>
        <div style={spanTag}>
          H1 Count <span>{data.pageHeadingsSummary.h1Count}</span>{' '}
        </div>
        <div style={spanTag}>
          H1 Content <span>{data.pageHeadingsSummary.h1Content}</span>{' '}
        </div>
        <div style={spanTag}>
          Focus Keywords Found <span>{data.pageHeadingsSummary.focusKeywordsFound}</span>{' '}
        </div>
        <div style={spanTag}>
          Keyword <span>{data.pageHeadingsSummary.keyword}</span>{' '}
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Not Found:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.pageHeadingsSummary.feedbackDetails.notFound.text}</p>
              <p>
                Positive or Negative? - {data.pageHeadingsSummary.feedbackDetails.notFound.class}
                {data.pageHeadingsSummary.feedbackDetails.notFound.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.pageHeadingsSummary.feedbackDetails.focusKeyword.text}</p>
              <p>
                Positive or Negative? -{' '}
                {data.pageHeadingsSummary.feedbackDetails.focusKeyword.class}
                {data.pageHeadingsSummary.feedbackDetails.focusKeyword.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.pageHeadingsSummary.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.pageHeadingsSummary.seoScore}/{data.pageHeadingsSummary.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>Word Count:</div>
        <div style={spanTag}>
          Input URL <span>{data.wordCount.inputUrl}</span>
        </div>
        <div style={spanTag}>
          Word Count Total <span>{data.wordCount.wordCountTotal}</span>
        </div>
        <div style={spanTag}>
          Corrected Word Count <span>{data.wordCount.correctedWordCount}</span>
        </div>
        <div style={spanTag}>
          Anchor Text Words <span>{data.wordCount.anchorTextWords}</span>
        </div>
        <div style={spanTag}>
          Anchor Percentage <span>{data.wordCount.anchorPercentage}</span>
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetailExtra}>
              <p>{data.wordCount.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.wordCount.feedbackDetails.found.class}
                {data.wordCount.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.wordCount.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.wordCount.seoScore}/{data.wordCount.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>On Page Links Summary:</div>
        <div style={spanTag}>
          Input URL <span>{data.wordCount.inputUrl}</span>
        </div>
        <div style={spanTag}>
          Total Links <span>{data.onPageLinksSummary.totalLinks}</span>
        </div>
        <div style={spanTag}>
          External Links <span>{data.onPageLinksSummary.externalLinks}</span>
        </div>
        <div style={spanTag}>
          Internal Links <span>{data.onPageLinksSummary.internalLinks}</span>
        </div>
        <div style={spanTag}>
          No Follow Count <span>{data.onPageLinksSummary.noFollowCount}</span>
        </div>
        <div style={spanTag}>
          Duplicate Links <span>{data.onPageLinksSummary.duplicateLinks}</span>
        </div>
        <div style={spanTag}>
          No Alt Tag <span>{data.onPageLinksSummary.noAltTag}</span>
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.onPageLinksSummary.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.onPageLinksSummary.feedbackDetails.found.class}
                {data.onPageLinksSummary.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.onPageLinksSummary.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.onPageLinksSummary.seoScore}/{data.onPageLinksSummary.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>Image Analysis:</div>
        <div style={spanTag}>
          Number of Images <span>{data.imageAnalysis.numberOfImages}</span>
        </div>
        <div style={spanTag}>
          Image Name Contains Keyword <span>{data.imageAnalysis.imageNameContainsKeyword}</span>
        </div>
        <div style={spanTag}>
          Image Alt Tag Contains Keyword{' '}
          <span>{data.imageAnalysis.imageAltTagContainsKeyword}</span>
        </div>
        <div style={spanTag}>
          Keyword <span>{data.imageAnalysis.keyword}</span>
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.imageAnalysis.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.imageAnalysis.feedbackDetails.found.class}
                {data.imageAnalysis.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>

          <div>
            <div style={feedbackDetails}>Image Name Contains Keyword:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.imageAnalysis.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.imageAnalysis.feedbackDetails.found.class}
                {data.imageAnalysis.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Image Alt Tag Contains Keyword:</div>
            <div style={feedbackDetailExtra}>
              <p>{data.imageAnalysis.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.imageAnalysis.feedbackDetails.found.class}
                {data.imageAnalysis.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.imageAnalysis.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.imageAnalysis.seoScore}/{data.imageAnalysis.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div style={modalText}>
        <div style={subTitles}>Keyword Density:</div>
        <div style={spanTag}>
          Keyword <span>{data.keywordDensity.keyword}</span>
        </div>
        <div style={spanTag}>
          Keyword Density <span>{data.keywordDensity.keywordDensity}</span>
        </div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetailExtra}>
              <p>{data.keywordDensity.feedbackDetails.found.text}</p>
              <p>
                Positive or Negative? - {data.keywordDensity.feedbackDetails.found.class}
                {data.keywordDensity.feedbackDetails.found.class == 'positive' ? (
                  <span style={summaryDotGreen}></span>
                ) : (
                  <span style={summaryDotRed}></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={spanTag}>
          Max SEO Score Available
          <span>{data.keywordDensity.maxSeoScoreAvailable}</span>
        </div>
        <div style={pbwrapper}>
          <div>SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>
              {data.keywordDensity.seoScore}/{data.keywordDensity.maxSeoScoreAvailable}
            </div>
          </div>
        </div>
      </div>
    </div>,
    console.log('I am a working modal'),
    10000
  );
};

const modalStyles = {
  position: 'fixed',
  zIndex: 1,
  top: '50%',
  left: '50%',
  overflowY: 'scroll',
  transform: 'translate(-50%, -54%)',
  height: '85vh',
  width: '50vw',
  border: '2px solid #000',
  borderRadius: '25px',
  background: '#f2fcfe',
  boxShadow: '20px 15px 20px 0px rgb(255 255 255 / 20%)',
  opacity: '0.8',
  padding: 10,
  paddingLeft: '30px',
  marginBottom: '50px',
  fontFamily: 'Ubuntu',
  lineHeight: 1.8,
} as const;

const modalText = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '18px',
} as const;

const modalTitle = {
  textAlign: 'center',
  fontSize: '30px',
  fontWeight: 600,
} as const;

const subTitles = {
  textAlign: 'justify',
  fontSize: '24px',
  fontWeight: 500,
} as const;

const feedbackDetailTitle = {
  textIndent: '20px',
  fontSize: '18px',
  fontWeight: 500,
} as const;

const feedbackDetails = {
  textIndent: '20px',
  fontsize: '16px',
};

const feedbackDetailExtra = {
  textIndent: '30px',
  fontSize: '16px',
  width: '40vh',
  display: 'inline',
};

const pbwrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '55vw',
  textAlign: 'center' as 'center',
};

const progressBar = {
  maxWidth: '27vw',
  width: '100%',
  backgroundColor: '#e0e0e0',
  borderRadius: '20px',
};

const progressBarFill = {
  display: 'block',
  height: '3.5vh',
  width: '100%',
  backgroundImage: 'repeating-linear-gradient(to left, #0546e0, #1172f9, #4892f9)',
  borderRadius: '20px',
};

const spanTag = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '34.2vw',
};

const summaryDotRed = {
  height: '25px',
  width: '25px',
  backgroundColor: '#ff0909',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'relative',
  left: '0.3vw',
  top: '0.2vw',
} as const;

const summaryDotYellow = {
  height: '25px',
  width: '25px',
  backgroundColor: '#FFCC00',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'relative',
  left: '0.3vw',
  top: '0.2vw',
} as const;

const summaryDotGreen = {
  height: '25px',
  width: '25px',
  backgroundColor: '#00ab66',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'relative',
  right: '-0.3vw',
  top: '0.2vw',
} as const;

export const getIframeHTMLContent = (): Promise<string> => {
  return appState.designerState.evaluateInFrame(() =>
    new XMLSerializer().serializeToString(document)
  );
};
