import React from 'react';
import Image from 'next/image';
import {
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { styled } from '@mui/material/styles';

const StyledComposer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  zIndex: 1200,
  '& .floating-button': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '50%',
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows[6],
    transition: theme.transitions.create(['transform', 'box-shadow']),
    '&:hover': {
      boxShadow: theme.shadows[8],
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
  '& .composer-modal': {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    zIndex: 1300,
  },
  '& .composer-content': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(4),
    maxWidth: 600,
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  '& .composer-header': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  '& .composer-avatar': {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[2],
  },
  '& .composer-textarea': {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    padding: theme.spacing(2),
    fontSize: '1rem',
    lineHeight: 1.5,
    resize: 'none',
    minHeight: 120,
    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  '& .composer-actions': {
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    '& .action-button': {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.secondary,
      borderRadius: 8,
      padding: theme.spacing(1, 2),
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      transition: theme.transitions.create(['background-color', 'color']),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.main,
      },
    },
    '& .post-button': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: 24,
      padding: theme.spacing(1.5, 3),
      fontWeight: 600,
      transition: theme.transitions.create(['background-color', 'transform']),
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.05)',
      },
    },
  },
}));

const PostComposer = () => {
  return (
    <StyledComposer>
      <div className="composer-header">
        <div className="flex-shrink-0">
          <Image
            src="/images/avatar.jpg"
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover border-2 border-white shadow"
            priority
          />
        </div>
        <div className="composer-content">
          <textarea
            className="composer-textarea"
            placeholder="Share your thoughts..."
            rows={2}
            style={{ minHeight: 120 }}
          />
          <div className="composer-actions">
            <div className="flex gap-1.5 text-gray-500">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm transition">
                <PhotoIcon className="h-5 w-5 text-green-500" />
                <span className="text-xs font-medium">Photo</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm transition">
                <VideoCameraIcon className="h-5 w-5 text-red-500" />
                <span className="text-xs font-medium">Video</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm transition">
                <ChartBarIcon className="h-5 w-5 text-sky-500" />
                <span className="text-xs font-medium">Event</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm transition">
                <FaceSmileIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-xs font-medium">Feeling</span>
              </button>
            </div>
            <button className="post-button">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
