// This is now a redirect to the unified post page
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Redirect to the post page with the same ID
    if (id) {
      router.replace(`/post/${id}`);
    }
  }, [id, router]);

  return (
    <>
      <Head>
        <title>Loading photo...</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    </>
  );
};

export default PhotoPage;
