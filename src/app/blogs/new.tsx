import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Typography, Container, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import BlogForm from "@/components/blogs/BlogForm";
import { BlogFormData } from '../../types/blog.types';

const NewBlogPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirect=/blogs/new`);
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real app, you would call your API here
      console.log('Submitting blog post:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to the new blog post
      const newBlogId = 'new-blog-id'; // Replace with actual ID from API
      router.push(`/blogs/${newBlogId}`);
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Create New Blog Post | Social Network</title>
        <meta name="description" content="Create a new blog post" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Blog Post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your thoughts, ideas, and expertise with the community.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <BlogForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEdit={false}
          initialData={{
            title: '',
            excerpt: '',
            content: '',
            category: '',
            tags: [],
            isPublished: false,
          }}
        />
      </Container>
    </>
  );
};

export default NewBlogPage;
