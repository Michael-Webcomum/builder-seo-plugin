import React from 'react';
import '@emotion/core';
import appState, { globalState } from '@builder.io/app-context';
import { Builder } from '@builder.io/react';
import { Button, Typography, Modal } from '@material-ui/core';
import Box from '@mui/material/Box';
import SeoModal from './components/SeoModal';

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

// export const showSeoModal = () => {
//   const ReviewModal = appState.globalState.openDialog(<SeoModal></SeoModal>);

//   return ReviewModal;
// };

// export const open = () => {
//   appState.openDialog(
//     <div id="modal" css={{ display: 'flex', alignItems: 'center' }}>
//       THIS WORKS?!
//     </div>
//   );
// };

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const expandSeoReview = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  appState.snackBar.show(
    <div css={{ display: 'flex', alignItems: 'center', margin: 'auto', backgroundColor: 'red' }}>
      Done!
    </div>,
    8000,

    <div id="container">
      <Button
        id="button"
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
          appState.openDialog(
            // seoModal()
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Title text in the MODAL!
                </Typography>
                <Typography id="modal-modal-description" style={{ marginTop: 2 }}>
                  Description of the MODAL (this is where the data is gonna go ;))
                </Typography>
              </Box>
            </Modal>
          );
        }}
      >
        Open Modal
      </Button>
    </div>
  );
};

export const getIframeHTMLContent = (): Promise<string> => {
  return appState.designerState.evaluateInFrame(() =>
    new XMLSerializer().serializeToString(document)
  );
};
