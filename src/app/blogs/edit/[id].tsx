import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Typography, Container, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import BlogForm from "@/components/blogs/BlogForm";
import { BlogFormData } from '../../../types/blog.types';

// Mock function to fetch blog post by ID - replace with actual API call
const fetchBlogPost = async (id: string): Promise<BlogFormData> => {
  // In a real app, this would be an API call
  console.log('Fetching blog post with ID:', id);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data - in a real app, this would come from your API
  return {
    id,
    title: 'Sample Blog Post Title',
    excerpt: 'This is a sample excerpt for the blog post that provides a brief summary of the content.',
    content: '# Welcome to My Blog Post\n\nThis is a sample blog post content. You can edit this text.\n\n## Features\n- Rich text editing\n- Markdown support\n- Image uploads\n- And more!',
    category: 'Technology',
    tags: ['React', 'Next.js', 'TypeScript'],
    featuredImage: 'https://via.placeholder.com/1200x630',
    isPublished: true,
    metaTitle: 'Sample Blog Post Title',
    metaDescription: 'This is a sample excerpt for the blog post that provides a brief summary of the content.',
    slug: 'sample-blog-post-title',
  };
};

const EditBlogPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [blogPost, setBlogPost] = useState<BlogFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch blog post data
  useEffect(() => {
    if (!id || !isAuthenticated) return;
    
    const loadBlogPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogPost(id as string);
        setBlogPost(data);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBlogPost();
  }, [id, isAuthenticated]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirect=/blogs/edit/${id}`);
    }
  }, [isAuthenticated, authLoading, router, id]);

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real app, you would call your API here
      console.log('Updating blog post:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to the updated blog post
      router.push(`/blogs/${id}`);
    } catch (err) {
      console.error('Error updating blog post:', err);
      setSubmitError('Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!blogPost) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Blog post not found</Alert>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Blog Post | Social Network</title>
        <meta name="description" content="Edit your blog post" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Blog Post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Make changes to your blog post below.
          </Typography>
        </Box>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <BlogForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEdit={true}
          initialData={blogPost}
        />
      </Container>
    </>
  );
};

export default EditBlogPage;
