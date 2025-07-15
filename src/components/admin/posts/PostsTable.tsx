'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Flag, Eye, EyeOff, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Post = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: string | null;
  };
  likes: number;
  comments: number;
  shares: number;
  reports: number;
  status: 'published' | 'hidden' | 'removed';
  isFlagged: boolean;
  createdAt: string;
  updatedAt: string;
};

export function PostsTable() {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-posts', page],
    queryFn: async () => {
      const response = await fetch(`/api/admin/posts?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setTotalPages(Math.ceil(data.total / limit));
      return data.posts as Post[];
    },
  });

  const toggleSelectAll = (checked: boolean) => {
    if (checked && posts) {
      setSelectedPosts(posts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const toggleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts(prev => [...prev, postId]);
    } else {
      setSelectedPosts(prev => prev.filter(id => id !== postId));
    }
  };

  const updatePostStatus = async (postIds: string[], status: Post['status']) => {
    try {
      const response = await fetch('/api/admin/posts/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postIds,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post status');
      }

      await refetch();
      setSelectedPosts([]);
      toast.success(`Post${postIds.length > 1 ? 's' : ''} ${status} successfully`);
    } catch (error) {
      toast.error('Failed to update post status');
      console.error(error);
    }
  };

  const toggleFlaggedStatus = async (postId: string, isFlagged: boolean) => {
    try {
      const response = await fetch(`/api/admin/posts/${postId}/flag`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFlagged: !isFlagged }),
      });

      if (!response.ok) {
        throw new Error('Failed to update flag status');
      }

      await refetch();
      toast.success(`Post ${isFlagged ? 'unflagged' : 'flagged'} successfully`);
    } catch (error) {
      toast.error('Failed to update flag status');
      console.error(error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      await refetch();
      setSelectedPosts(prev => prev.filter(id => id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedPosts.length > 0 && selectedPosts.length === posts?.length}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onCheckedChange={(checked) =>
                    toggleSelectPost(post.id, checked === true)
                  }
                  aria-label={`Select post ${post.id}`}
                />
              </TableCell>
              <TableCell className="max-w-[300px] truncate">
                <div className="line-clamp-2">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.image || ''} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.author.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                    </span>
                    <span className="text-sm">{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">
                      <User className="h-4 w-4" />
                    </span>
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  {post.reports > 0 && (
                    <Badge variant="destructive" className="h-5">
                      {post.reports} {post.reports === 1 ? 'report' : 'reports'}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    post.status === 'published'
                      ? 'default'
                      : post.status === 'hidden'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {post.status}
                </Badge>
                {post.isFlagged && (
                  <Badge variant="destructive" className="ml-2">
                    Flagged
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.open(`/post/${post.id}`, '_blank')}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Post
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        updatePostStatus(
                          [post.id],
                          post.status === 'published' ? 'hidden' : 'published'
                        )
                      }
                    >
                      {post.status === 'published' ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide Post
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Publish Post
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => toggleFlaggedStatus(post.id, post.isFlagged)}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      {post.isFlagged ? 'Remove Flag' : 'Flag as Inappropriate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPosts.length > 0 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''} selected
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePostStatus(selectedPosts, 'published')}
            >
              <Eye className="mr-2 h-4 w-4" />
              Publish
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePostStatus(selectedPosts, 'hidden')}
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePostStatus(selectedPosts, 'removed')}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((old) => old + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
