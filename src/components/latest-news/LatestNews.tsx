import React from 'react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  timeAgo: string;
  readTime: string;
  image?: string;
  category?: string;
}

interface LatestNewsProps {
  news: NewsItem[];
  onViewAll?: () => void;
  onNewsClick?: (id: string) => void;
}

const LatestNews: React.FC<LatestNewsProps> = ({ 
  news = [], 
  onViewAll = () => {},
  onNewsClick = () => {}
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Latest News</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNewsClick(item.id)}
          >
            <div className="flex items-start space-x-3">
              {item.image && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {item.category && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mb-1">
                    {item.category}
                  </span>
                )}
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-gray-500">
                  {item.timeAgo} • {item.readTime} read
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-4">
          <button 
            onClick={onViewAll}
            className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 text-center"
          >
            View all news
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
