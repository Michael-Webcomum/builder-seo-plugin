export interface seoAPIdata {
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
