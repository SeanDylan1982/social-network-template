'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';
import { formatDistanceToNow } from 'date-fns';
import { Photo } from '@/types/photo.types';

interface PhotoCardProps {
  photo: Photo;
  variant?: 'grid' | 'list' | 'masonry';
  showUser?: boolean;
  showActions?: boolean;
  onLike?: (photoId: string) => void;
  onBookmark?: (photoId: string) => void;
  onShare?: (photoId: string) => void;
}

export function PhotoCard({
  photo,
  variant = 'grid',
  showUser = true,
  showActions = true,
  onLike,
  onBookmark,
  onShare,
}: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(photo.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(photo.isBookmarked || false);
  const [likeCount, setLikeCount] = useState(photo.likeCount);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(prev => newLikeStatus ? prev + 1 : prev - 1);
    onLike?.(photo.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    onBookmark?.(photo.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(photo.id);
  };

  if (variant === 'list') {
    return (
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-48 h-48 flex-shrink-0">
            <Link href={`/photos/${photo.id}`} className="block h-full">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </Link>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1">
              <Link href={`/photos/${photo.id}`}>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{photo.title}</h3>
              </Link>
              {photo.description && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {photo.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {photo.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {photo.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{photo.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              {showUser && (
                <Link href={`/users/${photo.user.username}`} className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={photo.user.avatar} alt={photo.user.name} />
                    <AvatarFallback>
                      {photo.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{photo.user.name}</span>
                </Link>
              )}
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(photo.uploadDate), { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
        {showActions && (
          <div className="border-t px-4 py-2 flex items-center justify-between">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icons.heart
                className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`}
              />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={handleBookmark}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icons.bookmark
                className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icons.share2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/photos/${photo.id}`} className="block">
        <div
          className="relative aspect-square"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {(isHovered || variant === 'masonry') && (
            <div className="absolute inset-0 bg-black/30 flex flex-col p-4 transition-opacity">
              <div className="flex-1">
                <h3 className="font-semibold text-white line-clamp-2">{photo.title}</h3>
                {photo.description && (
                  <p className="text-white/80 text-sm line-clamp-2 mt-1">
                    {photo.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                {showUser && (
                  <Link
                    href={`/users/${photo.user.username}`}
                    className="flex items-center gap-2 group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={photo.user.avatar} alt={photo.user.name} />
                      <AvatarFallback className="text-xs">
                        {photo.user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white group-hover:underline">
                      {photo.user.name}
                    </span>
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-white/80">
                    <Icons.heart className="h-4 w-4" />
                    {likeCount}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-white/80">
                    <Icons.messageSquare className="h-4 w-4" />
                    {photo.commentCount}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
      {showActions && variant !== 'masonry' && (
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <Link href={`/photos/${photo.id}`} className="block">
                <h3 className="font-medium text-sm truncate">{photo.title}</h3>
              </Link>
              {showUser && (
                <Link
                  href={`/users/${photo.user.username}`}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  {photo.user.name}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.heart
                  className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`}
                />
              </button>
              <button
                onClick={handleBookmark}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.bookmark
                  className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
