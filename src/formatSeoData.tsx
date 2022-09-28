export function formatSeoData(data: any) {
  // Data is structured based on API and how Builder.io expects
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
          text: data['Meta description']['Feedback details']['Focus keywords position'].text,
          class: data['Meta description']['Feedback details']['Focus keywords position'].class,
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
          text: data['Image analysis']['Feedback details']['Image name contains keyword'].text,
          class: data['Image analysis']['Feedback details']['Image name contains keyword'].class,
        },
        imageAltTagContainsKeyword: {
          text: data['Image analysis']['Feedback details']['Image ALT tag contains keyword'].text,
          class: data['Image analysis']['Feedback details']['Image ALT tag contains keyword'].class,
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
