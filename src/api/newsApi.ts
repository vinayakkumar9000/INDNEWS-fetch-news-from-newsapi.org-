import { Article } from '../types';

const API_KEY = 'b98826d1ac0142db8927117b8454cdb1';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export async function fetchNews(params: {
  language: string;
  category?: string;
  query?: string;
}): Promise<Article[]> {
  const { language, category, query } = params;
  
  let url = query
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?language=${language}${category && category !== 'all' ? `&category=${category}` : ''}&apiKey=${API_KEY}`;
  
  url = `${CORS_PROXY}${encodeURIComponent(url)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  if (data.status === 'error') {
    throw new Error(data.message || 'Failed to fetch news');
  }

  return data.articles || [];
}