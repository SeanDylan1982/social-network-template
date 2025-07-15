import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PostDetail from "@/components/posts/PostDetail";
import { Post as PostType } from '../../types';

// This would typically come from your API
const mockPosts: Record<string, PostType> = {
  '1': {
    id: '1',
    type: 'image',
    user: {
      id: 'user1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/avatar-1.jpg',
    },
    mediaUrl: '/placeholder-photo-large.jpg',
    content: 'Beautiful day at the beach! 🏖️ #summer #vacation',
    timestamp: '2 hours ago',
    likes: 124,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c1',
        user: {
          id: 'user2',
          name: 'Jane Smith',
          username: 'janesmith',
          avatar: '/avatar-2.jpg',
        },
        text: 'Looks amazing! 😍',
        timestamp: '1 hour ago',
        likes: 5,
        isLiked: false,
      },
    ],
  },
  '2': {
    id: '2',
    type: 'text',
    user: {
      id: 'user2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: '/avatar-2.jpg',
    },
    content: 'Just finished my latest project! Check it out and let me know what you think. #webdev #react #typescript',
    timestamp: '5 hours ago',
    likes: 42,
    isLiked: true,
    isSaved: false,
    comments: [],
  },
  '3': {
    id: '3',
    type: 'video',
    user: {
      id: 'user3',
      name: 'Mike Johnson',
      username: 'mikej',
      avatar: '/avatar-3.jpg',
    },
    mediaUrl: '/sample-video.mp4',
    content: 'Check out this amazing sunset! 🌅 #nature #photography',
    timestamp: '1 day ago',
    likes: 256,
    isLiked: false,
    isSaved: true,
    comments: [],
  },
  '4': {
    id: '4',
    type: 'article',
    user: {
      id: 'user4',
      name: 'Sarah Williams',
      username: 'sarahw',
      avatar: '/avatar-4.jpg',
    },
    mediaUrl: '',
    content: '10 Tips for Better Productivity in 2023',
    timestamp: '2 days ago',
    likes: 89,
    isLiked: false,
    isSaved: true,
    comments: [],
  },
};

interface PostPageProps {
  post: PostType | null;
}

export default function PostPage({ post: initialPost }: PostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<PostType | null>(initialPost);

  // If the post wasn't provided via server-side props, try to fetch it
  useEffect(() => {
    const fetchPost = async () => {
      if (!initialPost && router.query.id) {
        // In a real app, you would fetch the post from your API
        // const response = await fetch(`/api/posts/${router.query.id}`);
        // const data = await response.json();
        // setPost(data);
        
        // For now, we'll use our mock data
        const mockPost = mockPosts[router.query.id as string];
        if (mockPost) {
          setPost(mockPost);
        }
      }
    };

    fetchPost();
  }, [initialPost, router.query.id]);

  if (!post) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>Post not found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>
          {post.user.name} on {process.env.NEXT_PUBLIC_APP_NAME || 'Social Network'}
        </title>
        <meta name="description" content={post.content} />
        {post.type === 'image' && post.mediaUrl && (
          <meta property="og:image" content={post.mediaUrl} />
        )}
      </Head>
      <PostDetail post={post} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  // In a real app, you would fetch the post from your database here
  // const res = await fetch(`${process.env.API_URL}/posts/${id}`);
  // const post = await res.json();
  
  // For now, we'll use our mock data
  const post = mockPosts[id] || null;

  return {
    props: {
      post,
    },
  };
};
