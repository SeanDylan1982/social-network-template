import React from 'react';
import { Box, Container, Grid, Hidden } from '@mui/material';

// Minimal placeholder components
const Post = () => <div>Post Component</div>;
const Stories = () => <div>Stories Component</div>;
const WhoToFollow = () => <div>WhoToFollow Component</div>;
const News = () => <div>News Component</div>;

const Home = () => {
  return (
    <Box sx={{ pt: 2, pb: 4, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Main Content */}
          <Grid item xs={12} md={8} lg={6}>
            <Stories />
            <Post />
          </Grid>

          {/* Right Sidebar */}
          <Hidden mdDown>
            <Grid item lg={3}>
              <WhoToFollow />
              <News />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
