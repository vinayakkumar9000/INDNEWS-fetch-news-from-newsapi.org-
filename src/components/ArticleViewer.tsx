import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Article } from '../types';

interface ArticleViewerProps {
  article: Article;
  onBack: () => void;
}

export default function ArticleViewer({ article, onBack }: ArticleViewerProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to News</span>
        </button>

        <article className="prose dark:prose-invert max-w-none">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{article.source.name}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
              {article.description}
            </p>
          )}

          {article.content && (
            <div className="text-gray-700 dark:text-gray-200 space-y-4">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              This is a preview of the article. For the full content, please visit{' '}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {article.source.name}
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}