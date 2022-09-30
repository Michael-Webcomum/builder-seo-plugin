import React from 'react';
import { css } from '@emotion/core';
import appState, { globalState } from '@builder.io/app-context';
import { Builder } from '@builder.io/react';
import { Button, Typography, Modal } from '@material-ui/core';
import { prepareSeoData } from './prepareSeoData';
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

export const seoReviewModalName = 'seo-review-modal';
export const seoReviewModal = () =>
  appState.models.result.find((m: any) => m.name === seoReviewModalName);
export const seoReviewModalTemplate = () => ({
  '@version': 2,
  name: seoReviewModalName,
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
  helperText: 'SEO Review Modal',
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

// let seoAPIDataFormatted: any = prepareSeoData();
// seoAPIDataFormatted = formatSeoData(seoAPIDataFormatted);

export const expandSeoReview = () => {
  // const dataForModal = appState.globalState.openDialog(getSEOReviewModel, {
  //   data: seoAPIDataFormatted,
  // });

  appState.globalState.openDialog(
    <div
      // onClick={() => dataForModal()}
      style={{
        position: 'fixed',
        zIndex: 1,
        top: '50%',
        left: '50%',
        overflowY: 'initial',
        transform: 'translate(-50%, -54%)',
        width: '60vw',
        border: '2px solid #000',
        borderRadius: '25px',
        background: '#f2fcfe',
        opacity: '0.8',
        padding: 10,
        marginBottom: '50px',
        fontFamily: 'Ubuntu',
      }}
    >
      <div
        style={{
          margin: 'scroll',
          width: '90%',
          padding: '8px',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 500,
          }}
        >
          SEO Review <br />
        </div>
        <div
          style={{
            display: 'flex',
            overflowY: 'auto',
            padding: '10px 10px 10px 10px',
            height: '80vh',
            textAlign: 'justify',
          }}
        >
          <div
            style={{
              flex: '90%',
              textAlign: 'left',
              lineHeight: 1.6,
            }}
          >
            <br />
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Overview -<br />
                <br />
              </div>
              Keyword: deal
              <br />
              Overall SEO score: 2
              <br />
              Available SEO points: 330
              <br />
              Earned SEO points: 5
              <br />
              Summary -<br />
              Errors: 15
              <br />
              Warnings: 1
              <br />
              Optimized: 0
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Title tag -<br />
                <br />
              </div>
              Result: 1
              <br />
              Title found: Not found
              <br /> Input URL: <br />
              Title tag: Not found
              <br />
              Title length: 0
              <br /> title tag number: 1
              <br /> Focus keywords position: 0
              <br /> Focus keywords found: 0
              <br /> Keyword: deal
              <br /> Feedback details -<br /> Found -<br /> text: Add a Title tag to your webpage
              <br /> class: negative
              <br /> Length -<br /> text: Your Title tag is too short
              <br /> a minimum of 30 characters is recommended
              <br /> class: negative
              <br /> Focus keyword -<br /> text: You are not using your focus keyword: \deal\ in
              your Title tag
              <br /> class: negative
              <br /> Focus keywords position -<br /> text: Your are using your focus keyword not at
              the start of your Title tag
              <br />
              class: negative
              <br /> Max SEO score available: 90
              <br /> SEO Score: 0
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Meta description -<br />
                <br />
              </div>
              Result: 1
              <br />
              Meta description found: Not found
              <br />
              Input URL: N/A
              <br />
              Meta description: Not found
              <br />
              Meta description length: 0
              <br />
              meta description number: 1
              <br />
              Focus keywords position: 0
              <br />
              Focus keywords found: 0
              <br />
              Keyword: deal
              <br />
              Feedback details -<br />
              Found -<br />
              text: Add a Meta description to your webpage
              <br />
              class: negative
              <br />
              Length -<br />
              text: Your Meta description is too short a minimum of 100 characters is recommended
              <br />
              class: negative
              <br />
              Focus keyword -<br />
              text: You are not using your focus keyword: \deal\ in your Meta description
              <br />
              class: negative
              <br />
              Focus keywords position -<br />
              text: Your are not using your focus keyword at the start of your Meta description tag
              <br />
              class: negative
              <br />
              Max SEO score available: 20
              <br />
              SEO Score: 0
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Page Headings summary -<br />
                <br />
              </div>
              H1: 0
              <br />
              H2: 0
              <br />
              H3: 0
              <br />
              H4: 0
              <br />
              H5: 0
              <br />
              H6: 0
              <br />
              H1 count: 0
              <br />
              H1 Content: <br />
              Focus keywords found: 0
              <br />
              Keyword: deal
              <br />
              Feedback details -<br />
              Not found -<br />
              text: Add a H1 to your webpage
              <br />
              class: negative
              <br />
              Focus keyword -<br />
              text: You are not using your focus keyword: \deal\ in your H1 tag
              <br />
              class: negative
              <br />
              Max SEO score available: 20
              <br />
              SEO Score: 0
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Word count -<br />
                <br />
              </div>
              Input URL: <br />
              Word count total: 1
              <br />
              Corrected word count: 1
              <br />
              Anchor text words: 0
              <br />
              Anchor Percentage: 0
              <br />
              Feedback details -<br />
              Found -<br />
              text: You should write more content for this page
              <br />
              class: could have
              <br />
              Max SEO score available: 50
              <br />
              SEO Score: 5
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                On page links summary -<br />
                <br />
              </div>
              Total links: 0
              <br />
              External links: 0
              <br />
              Internal: 0
              <br />
              Nofollow count: 0
              <br />
              Duplicate links: 0
              <br />
              No alt tag: 0
              <br />
              Feedback details -<br />
              Found -<br />
              text: Your webpage contains less than 2 links
              <br />
              class: negative
              <br />
              Max SEO score available: 40
              <br />
              SEO Score: 0
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Image analysis -<br />
                <br />
              </div>
              Number of images: 0
              <br />
              Image name contains keyword: 0
              <br />
              Image ALT tag contains keyword: 0
              <br />
              Keyword: deal
              <br />
              Feedback details -<br />
              Found -<br />
              text: Add a Image to your webpage
              <br />
              class: negative
              <br />
              Image name contains keyword -<br />
              text: You are not using your focus keyword: \deal\ in your image Name
              <br />
              class: negative
              <br />
              Image ALT tag contains keyword -<br />
              text: You are not using your focus keyword: \deal\ in your image ALT Tag
              <br />
              class: negative
              <br />
              Max SEO score available: 20
              <br />
              SEO Score: 0
              <br />
              <br />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                Keyword density -<br />
                <br />
              </div>
              Keyword: deal
              <br />
              Keyword density: 0
              <br />
              Feedback details -<br />
              Found -<br />
              text: You should add your focus keyword to the content of your page
              <br />
              class: negative
              <br /> Max SEO score available: 90
              <br />
              SEO Score: 0<br />
            </div>
          </div>
        </div>
      </div>
    </div>,
    console.log('I am a working modal'),
    10000
  );
};

export const getIframeHTMLContent = (): Promise<string> => {
  return appState.designerState.evaluateInFrame(() =>
    new XMLSerializer().serializeToString(document)
  );
};
