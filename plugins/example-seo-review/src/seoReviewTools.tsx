// import pkg from '../package.json';
// import appState from '@builder.io/app-context';
// import React, { useState } from 'react';
// import {
//   getSEOReviewModel,
//   getSEOReviewModelTemplate,
//   registerContentAction,
//   getIframeHTMLContent,
//   showReviewNotifications,
//   fastClone,
// } from './utils';

// interface SeoReviewAPIProps {
//   inputUrl?: any;
//   keywordInput?: any;
// }

// function SeoReviewAPI({ ...props }: SeoReviewAPIProps) {
//   const [data, setData] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [err, setErr] = useState('');

//   const handleClick = async e => {
//     console.log('handleClick is running');
//     setIsLoading(true);
//     e.preventDefault();

//     let displayData;

//     const inputUrl = document.querySelector('#content-analysis-url');
//     const keyword = document.querySelector('#keyword1');
//     const apiKey = 'as-sdf-fvhgffdgjkh87349hlm768';

//     try {
//       let searchInput = props.inputUrl;
//       let keywordInput = props.keywordInput;

//       const response = await fetch(
//         `https://api.seoreviewtools.com/seo-content-analysis/?keyword=${keywordInput}&url=${searchInput}&key=${apiKey}`
//       );

//       if (!response.ok) {
//         throw new Error(`Error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       console.log('result is: ', JSON.stringify(result, null, 4));

//       displayData = result;

//       console.log(result);
//       if (result) {
//         const result = Object.values(result.data);

//         setData(result);
//       }
//     } catch (err) {
//       setErr(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
// }

// export default SeoReviewAPI;
