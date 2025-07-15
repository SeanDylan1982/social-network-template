'use client';

import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  Reply,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Comment {
  id: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt?: string;
  isEdited?: boolean;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  replies?: Comment[];
}

interface CommentsSectionProps {
  comments: Comment[];
  totalComments: number;
  isLoading?: boolean;
  isSubmitting?: boolean;
  currentUserId?: string;
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onLikeComment: (commentId: string) => Promise<void>;
  onEditComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLoadMoreReplies?: (commentId: string) => Promise<void>;
  className?: string;
}

export function CommentsSection({
  comments,
  totalComments,
  isLoading = false,
  isSubmitting = false,
  currentUserId,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
  onLoadMoreReplies,
  className,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  const [commentLikes, setCommentLikes] = useState<Record<string, { count: number; isLiked: boolean }>>({});
  
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize comment likes state
  useEffect(() => {
    const initialLikes: Record<string, { count: number; isLiked: boolean }> = {};
    
    const processComments = (commentList: Comment[]) => {
      commentList.forEach(comment => {
        initialLikes[comment.id] = {
          count: comment.likeCount,
          isLiked: comment.isLiked
        };
        
        if (comment.replies) {
          processComments(comment.replies);
        }
      });
    };
    
    processComments(comments);
    setCommentLikes(initialLikes);
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      if (editingCommentId) {
        await onEditComment(editingCommentId, newComment);
        setEditingCommentId(null);
      } else if (replyingTo) {
        await onAddComment(newComment, replyingTo);
        setReplyingTo(null);
        
        // Expand replies for the parent comment
        setExpandedReplies(prev => ({
          ...prev,
          [replyingTo]: true
        }));
      } else {
        await onAddComment(newComment);
      }
      
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleLike = async (commentId: string) => {
    const currentLikeState = commentLikes[commentId] || { count: 0, isLiked: false };
    const newLikeState = {
      count: currentLikeState.isLiked ? currentLikeState.count - 1 : currentLikeState.count + 1,
      isLiked: !currentLikeState.isLiked
    };
    
    // Optimistic update
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: newLikeState
    }));
    
    try {
      await onLikeComment(commentId);
    } catch (error) {
      // Revert on error
      setCommentLikes(prev => ({
        ...prev,
        [commentId]: currentLikeState
      }));
      console.error('Failed to like comment:', error);
    }
  };

  const startReplying = (commentId: string) => {
    setReplyingTo(commentId);
    setEditingCommentId(null);
    setEditedContent('');
    setTimeout(() => commentInputRef.current?.focus(), 0);
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
    setReplyingTo(null);
    setTimeout(() => {
      editInputRef.current?.focus();
      // Move cursor to end of text
      const length = comment.content.length;
      editInputRef.current?.setSelectionRange(length, length);
    }, 0);
  };

  const toggleReplies = (commentId: string) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const toggleExpandReplies = (commentId: string) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const isCurrentUser = comment.user.id === currentUserId;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedReplies[comment.id] ?? true;
    const isShowingReplies = showReplies[comment.id] ?? false;
    
    return (
      <div key={comment.id} className={cn('space-y-4', !isReply && 'py-4')}>
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{comment.user.name}</span>
              {comment.user.isVerified && (
                <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
              <span className="text-xs text-muted-foreground ml-1">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                {comment.isEdited && ' • Edited'}
              </span>
            </div>
            
            {editingCommentId === comment.id ? (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (editedContent.trim()) {
                    await onEditComment(comment.id, editedContent);
                    setEditingCommentId(null);
                  }
                }}
                className="mt-1"
              >
                <Textarea
                  ref={editInputRef}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setEditingCommentId(null);
                    } else if (e.key === 'Enter' && e.metaKey) {
                      if (editedContent.trim()) {
                        onEditComment(comment.id, editedContent);
                        setEditingCommentId(null);
                      }
                    }
                  }}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingCommentId(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-sm mt-1 whitespace-pre-line">{comment.content}</p>
            )}
            
            <div className="flex items-center gap-4 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-8 gap-1 text-muted-foreground',
                  commentLikes[comment.id]?.isLiked && 'text-blue-500'
                )}
                onClick={() => handleLike(comment.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{commentLikes[comment.id]?.count || 0}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-muted-foreground"
                onClick={() => startReplying(comment.id)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Reply</span>
              </Button>
              
              {isCurrentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => startEditing(comment)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onSelect={() => onDeleteComment(comment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            {replyingTo === comment.id && (
              <div className="mt-3 pl-4 border-l-2 border-muted">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <Textarea
                    ref={commentInputRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a reply..."
                    className="min-h-[80px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setReplyingTo(null);
                        setNewComment('');
                      } else if (e.key === 'Enter' && e.metaKey) {
                        if (newComment.trim()) {
                          handleSubmit(e);
                        }
                      }
                    }}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(null);
                        setNewComment('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={!newComment.trim() || isSubmitting}>
                      {isSubmitting ? 'Replying...' : 'Reply'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        
        {hasReplies && (
          <div className="pl-8">
            {isExpanded ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-muted-foreground h-8 px-2 -ml-2"
                  onClick={() => toggleExpandReplies(comment.id)}
                >
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide replies ({comment.replies?.length})
                </Button>
                
                <div className="space-y-4 mt-2">
                  {comment.replies?.map(reply => renderComment(reply, true))}
                </div>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground h-8 px-2 -ml-2"
                onClick={() => toggleExpandReplies(comment.id)}
              >
                <ChevronDown className="h-4 w-4 mr-1" />
                Show {comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </div>
        )}
        
        {!isReply && <Separator />}
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="font-medium text-lg">Comments • {totalComments}</h3>
      
      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  if (newComment.trim()) {
                    handleSubmit(e);
                  }
                }
              }}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!newComment.trim() || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Comment</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
                <div className="h-3 w-full rounded bg-muted animate-pulse" />
                <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
                <div className="flex gap-4 pt-1">
                  <div className="h-6 w-12 rounded bg-muted animate-pulse" />
                  <div className="h-6 w-12 rounded bg-muted animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-0">
          {comments.map(comment => renderComment(comment))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
