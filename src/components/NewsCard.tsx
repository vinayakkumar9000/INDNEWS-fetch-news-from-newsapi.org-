import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  onClick: () => void;
}

export default function NewsCard({ article, onClick }: NewsCardProps) {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } else {
        await navigator.clipboard.writeText(article.url);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      }
    } catch (error) {
      // Fallback to clipboard if sharing fails
      try {
        await navigator.clipboard.writeText(article.url);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
      }
    }
  };

  return (
    <article
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <img
          src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <button
            onClick={handleShare}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 relative"
          >
            {showCopiedMessage ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            )}
            {showCopiedMessage && (
              <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                Copied to clipboard!
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{article.source.name}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{article.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{article.description}</p>
      </div>
    </article>
  );
}