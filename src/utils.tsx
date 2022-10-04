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

// export const seoReviewModalName = 'seo-review-modal';
// export const seoReviewModal = () =>
//   appState.models.result.find((m: any) => m.name === seoReviewModalName);
// export const seoReviewModalTemplate = () => ({
//   '@version': 2,
//   name: seoReviewModalName,
//   kind: 'data' as const,
//   subType: '',
//   schema: {},
//   publishText: 'Authorize',
//   unPublishText: 'Cancel',
//   fields: [
//     {
//       '@type': '@builder.io/core:Field',
//       name: 'description',
//       type: 'text',
//       required: false,
//       helperText: 'Example field',
//     },
//   ],
//   helperText: 'SEO Review Modal',
//   publicWritable: false,
//   publicReadable: false,
//   strictPrivateRead: true,
//   strictPrivateWrite: false,
//   showMetrics: false,
//   showAbTests: false,
//   showTargeting: false,
//   showScheduling: false,
//   hideFromUI: false,
// });

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
const styles = {
  position: 'fixed',
  zIndex: 1,
  top: '50%',
  left: '50%',
  overflowY: 'initial',
  transform: 'translate(-50%, -54%)',
  height: '80vh',
  width: '60vw',
  border: '2px solid #000',
  borderRadius: '25px',
  background: '#f2fcfe',
  opacity: '0.8',
  padding: 10,
  marginBottom: '50px',
  fontFamily: 'Ubuntu',
} as const;

export const expandSeoReview = (formatSeoData: any) => {
  // const dataForModal = appState.globalState.openDialog(getSEOReviewModel, {
  //   data: seoAPIDataFormatted,
  // });

  const fakeData = {
    students: 'present',
  };

  appState.globalState.openDialog(
    <div style={styles}>
      <div>I am the title</div>
      <div>{formatSeoData.Overview}</div>
      <div>{formatSeoData.titleTag}</div>
      <div>{fakeData.students}</div>
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
