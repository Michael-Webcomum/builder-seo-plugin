import appState from '@builder.io/app-context';
import { getIframeHTMLContent } from './utils';
import { seoAPIdata } from './interfaces';

export async function prepareSeoData() {
  //Obtain user input keyword (necessary for API) in Builder.io
  const keyword = await appState.dialogs.prompt({
    placeholderText: 'Enter a keyword to test',
  });
  const baseURL = `https://api.seoreviewtools.com/seo-content-analysis/`;
  const apiKey = 'as-sdf-fvhgffdgjkh87349hlm768';

  //Read innerHTML content to be sent for SEO review
  const iframeHTMLContent = await getIframeHTMLContent();
  console.log('plugin: iframeHTMLContent', iframeHTMLContent);

  try {
    // Fetching SEO data from SEO Review Tools API
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

    //Received data is checked with corresponding interface - seoAPIdata
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
