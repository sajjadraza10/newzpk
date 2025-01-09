export interface NYTApiResponse {
    status: string;
    copyright: string;
    response: {
      docs: NYTArticle[];
      meta: {
        hits: number;
        offset: number;
        time: number;
      }
    }
  }
  
  export interface NYTArticle {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    print_section: string;
    print_page: string;
    source: string;
    multimedia: Array<{
      url: string;
      format: string;
      height: number;
      width: number;
      type: string;
      subtype: string;
      caption: string;
      credit: string;
    }>;
    headline: {
      main: string;
      kicker: string;
      content_kicker: string;
      print_headline: string;
      name: string;
      seo: string;
      sub: string;
    };
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    byline: {
      original: string;
      person: Array<{
        firstname: string;
        middlename: string;
        lastname: string;
        qualifier: string;
        title: string;
        role: string;
        organization: string;
        rank: number;
      }>;
      organization: string;
    };
  }
  
  export interface NYTApiParams {
    q?: string;
    fq?: string;
    page?: number;
    sort?: 'newest' | 'oldest' | 'relevance';
  }