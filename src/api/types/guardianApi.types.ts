export interface GuardianApiResponse {
    response: {
      status: string;
      userTier: string;
      total: number;
      startIndex: number;
      pageSize: number;
      currentPage: number;
      pages: number;
      orderBy: string;
      results: GuardianArticle[];
    }
  }
  
  export interface GuardianArticle {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    fields: {
      headline: string;
      thumbnail: string;
      bodyText: string;
    };
    pillarName: string;
  }
  
  export interface GuardianApiParams {
    q?: string;
    section?: string;
    page?: number;
    'page-size'?: number;
    'order-by'?: 'newest' | 'oldest' | 'relevance';
  }