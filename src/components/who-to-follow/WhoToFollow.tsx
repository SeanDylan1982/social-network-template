import React from 'react';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  isVerified?: boolean;
}

interface WhoToFollowProps {
  users: User[];
  onFollow?: (userId: string) => void;
  onViewAll?: () => void;
}

const WhoToFollow: React.FC<WhoToFollowProps> = ({ 
  users = [], 
  onFollow = () => {},
  onViewAll = () => {}
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Who to Follow</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {users.map((user) => (
          <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </h4>
                  {user.isVerified && (
                    <svg className="w-3.5 h-3.5 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{user.role}</p>
              </div>
            </div>
            <button 
              onClick={() => onFollow(user.id)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              Follow
            </button>
          </div>
        ))}
        
        <div className="p-4">
          <button 
            onClick={onViewAll}
            className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 text-center"
          >
            See all suggestions
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
