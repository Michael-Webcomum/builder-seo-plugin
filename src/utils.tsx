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

export const showReviewNotifications = (jobId: string) => {
  appState.snackBar.show(
    <div css={{ display: 'flex', alignItems: 'center' }}>Done!</div>,
    8000,
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

export const expandSeoReview = (dataToFormat: any) => {
  const data = formatSeoData(dataToFormat);

  appState.globalState.openDialog(
    <div style={modalStyles}>
      <div style={modalTitle}>SEO Review Results</div>
      <div style={modalText}>
        <div style={subTitles}>Overview:</div>

        <div>Keyword - {data.overview.keyword}</div>
        <div style={pbwrapper}>
          <div>Overall SEO Score</div>
          <div style={progressBar}>
            <div style={progressBarFill}>{data.overview.overallSeoScore}/100</div>
          </div>
        </div>

        <div>
          <div>Available SEO Points - {data.overview.availableSeoPoints}</div>
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
            <div>Errors - {data.overview.summary.errors}</div>
            <div>Optimized - {data.overview.summary.optimized}</div>
            <div>Warnings - {data.overview.summary.warnings}</div>
          </div>
        </div>
      </div>
      <br />
      <div style={modalText}>
        <div style={subTitles}>Title Tag:</div>

        <div>Result - {data.titleTag.Result}</div>
        <div>Title Found - {data.titleTag.titleFound}</div>
        <div>Input URL - {data.titleTag.inputUrl}</div>
        <div>Title Tag - {data.titleTag.titleTag}</div>
        <div>Title Length - {data.titleTag.titleLength}</div>
        <div>Title Tag Number - {data.titleTag.titleTagNumber}</div>
        <div>Focus Keywords Position - {data.titleTag.focusKeywordsPosition}</div>
        <div>Focus Keywords Found - {data.titleTag.focusKeywordsFound}</div>
        <div>Keyword - {data.titleTag.keyword}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.titleTag.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.titleTag.feedbackDetails.found.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Length:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.titleTag.feedbackDetails.length.text}</div>
              <div>Positive or Negative? - {data.titleTag.feedbackDetails.length.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.titleTag.feedbackDetails.focusKeyword.text}</div>
              <div>Positive or Negative? - {data.titleTag.feedbackDetails.focusKeyword.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword Position:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.titleTag.feedbackDetails.focusKeywordsPosition.text}</div>
              <div>
                Positive or Negative? - {data.titleTag.feedbackDetails.focusKeywordsPosition.class}
              </div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.titleTag.maxSeoScoreAvailable}</div>
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
        <div>Result - {data.metaDescription.result}</div>
        <div>Meta Description Found - {data.metaDescription.metaDescriptionFound}</div>
        <div>Input URL - {data.metaDescription.inputUrl}</div>
        <div>Meta Description - {data.metaDescription.metaDescription}</div>
        <div>Meta Description Length - {data.metaDescription.metaDescriptionLength}</div>
        <div>Meta Description Number - {data.metaDescription.metaDescriptionNumber}</div>
        <div>Focus Keywords Position - {data.metaDescription.focusKeywordsPosition}</div>
        <div>Focus Keywords Found - {data.metaDescription.focusKeywordsPosition}</div>
        <div>Keyword - {data.metaDescription.keyword}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.metaDescription.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.metaDescription.feedbackDetails.found.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Length:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.metaDescription.feedbackDetails.length.text}</div>
              <div>Positive or Negative? - {data.metaDescription.feedbackDetails.length.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.metaDescription.feedbackDetails.focusKeyword.text}</div>
              <div>
                Positive or Negative? - {data.metaDescription.feedbackDetails.focusKeyword.class}
              </div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keywords Position:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.metaDescription.feedbackDetails.focusKeywordsPosition.text}</div>
              <div>
                Positive or Negative? -{' '}
                {data.metaDescription.feedbackDetails.focusKeywordsPosition.class}
              </div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.metaDescription.maxSeoScoreAvailable}</div>
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
        <div>H1 - {data.pageHeadingsSummary.h1}</div>
        <div>H2 - {data.pageHeadingsSummary.h2}</div>
        <div>H3 - {data.pageHeadingsSummary.h3}</div>
        <div>H4 - {data.pageHeadingsSummary.h4}</div>
        <div>H5 - {data.pageHeadingsSummary.h5}</div>
        <div>H6 - {data.pageHeadingsSummary.h6}</div>
        <div>H1 Count - {data.pageHeadingsSummary.h1Count}</div>
        <div>H1 Content - {data.pageHeadingsSummary.h1Content}</div>
        <div>Focus Keywords Found - {data.pageHeadingsSummary.focusKeywordsFound}</div>
        <div>Keyword - {data.pageHeadingsSummary.keyword}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Not Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.pageHeadingsSummary.feedbackDetails.notFound.text}</div>
              <div>
                Positive or Negative? - {data.pageHeadingsSummary.feedbackDetails.notFound.class}
              </div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Focus Keyword:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.pageHeadingsSummary.feedbackDetails.focusKeyword.text}</div>
              <div>
                Positive or Negative? -{' '}
                {data.pageHeadingsSummary.feedbackDetails.focusKeyword.class}
              </div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.pageHeadingsSummary.maxSeoScoreAvailable}</div>
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
        <div>Input URL - {data.wordCount.inputUrl}</div>
        <div>Word Count Total - {data.wordCount.wordCountTotal}</div>
        <div>Corrected Word Count - {data.wordCount.correctedWordCount}</div>
        <div>Anchor Text Words - {data.wordCount.anchorTextWords}</div>
        <div>Anchor Percentage - {data.wordCount.anchorPercentage}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.wordCount.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.wordCount.feedbackDetails.found.class}</div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.wordCount.maxSeoScoreAvailable}</div>
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
        <div>Total Links - {data.onPageLinksSummary.totalLinks}</div>
        <div>External Links - {data.onPageLinksSummary.externalLinks}</div>
        <div>Internal Links - {data.onPageLinksSummary.internalLinks}</div>
        <div>No Follow Count - {data.onPageLinksSummary.noFollowCount}</div>
        <div>Duplicate Links - {data.onPageLinksSummary.duplicateLinks}</div>
        <div>No Alt Tag - {data.onPageLinksSummary.noAltTag}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.onPageLinksSummary.feedbackDetails.found.text}</div>
              <div>
                Positive or Negative? - {data.onPageLinksSummary.feedbackDetails.found.class}
              </div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.onPageLinksSummary.maxSeoScoreAvailable}</div>
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
        <div>Number of Images - {data.imageAnalysis.numberOfImages}</div>
        <div>Image Name Contains Keyword - {data.imageAnalysis.imageNameContainsKeyword}</div>
        <div>Image Alt Tag Contains Keyword - {data.imageAnalysis.imageAltTagContainsKeyword}</div>
        <div>Keyword - {data.imageAnalysis.keyword}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.imageAnalysis.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.imageAnalysis.feedbackDetails.found.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Image Name Contains Keyword:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.imageAnalysis.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.imageAnalysis.feedbackDetails.found.class}</div>
            </div>
          </div>
          <div>
            <div style={feedbackDetails}>Image Alt Tag Contains Keyword:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.imageAnalysis.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.imageAnalysis.feedbackDetails.found.class}</div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.imageAnalysis.maxSeoScoreAvailable}</div>
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
        <div>Keyword - {data.keywordDensity.keyword}</div>
        <div>Keyword Density - {data.keywordDensity.keywordDensity}</div>
        <div>
          <div style={feedbackDetailTitle}>Feedback Details:</div>
          <div>
            <div style={feedbackDetails}>Found:</div>
            <div style={feedbackDetailExtra}>
              <div>{data.keywordDensity.feedbackDetails.found.text}</div>
              <div>Positive or Negative? - {data.keywordDensity.feedbackDetails.found.class}</div>
            </div>
          </div>
        </div>
        <div>Max SEO Score Available - {data.keywordDensity.maxSeoScoreAvailable}</div>
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
  height: '80vh',
  width: '60vw',
  border: '2px solid #000',
  borderRadius: '25px',
  background: '#f2fcfe',
  boxShadow: '20px 15px 20px 0px rgb(255 255 255 / 20%)',
  opacity: '0.8',
  padding: 10,
  paddingLeft: '30px',
  marginBottom: '50px',
  fontFamily: 'Ubuntu',
  lineHeight: 1.6,
} as const;

const modalText = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
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
  textIndent: '40px',
  fontsize: '16px',
};

const feedbackDetailExtra = {
  textIndent: '60px',
  fontSize: '16px',
  width: '40vh',
};

const pbwrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
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
  height: '3vh',
  width: '100%',
  backgroundColor: '#1A73E8',
  borderRadius: '20px',
};

export const getIframeHTMLContent = (): Promise<string> => {
  return appState.designerState.evaluateInFrame(() =>
    new XMLSerializer().serializeToString(document)
  );
};
