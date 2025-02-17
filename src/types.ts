export interface Article {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  url: string;
  source: {
    name: string;
  };
  category?: string;
}

export type Category = 'all' | 'world' | 'business' | 'technology' | 'entertainment' | 'sports' | 'science' | 'health';

export interface Language {
  code: string;
  name: string;
  flag: string;
}