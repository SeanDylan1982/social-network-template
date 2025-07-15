import React from 'react';
import Head from 'next/head';
import { Box, Container, styled, Typography, Avatar, Button } from '@mui/material';
import { FollowUserHandler, ViewAllHandler, NewsClickHandler } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

const StyledContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: 'background.default',
  display: 'flex',
  flexDirection: 'column',
});

const MainContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 280,
    flexShrink: 0,
  },
}));

const StickySidebar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const MainArea = styled(Box)({
  flex: 1,
  minWidth: 0, // Prevents flex item from overflowing
});

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Social Network',
  leftSidebar,
  rightSidebar,
}) => {
  return (
    <StyledContainer>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A modern social network platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContent maxWidth={false}>
        {leftSidebar && (
          <Sidebar>
            <StickySidebar>{leftSidebar}</StickySidebar>
          </Sidebar>
        )}

        <MainArea>{children}</MainArea>

        {rightSidebar && (
          <Sidebar>
            <StickySidebar>{rightSidebar}</StickySidebar>
          </Sidebar>
        )}
      </MainContent>
    </StyledContainer>
  );
};

export default MainLayout;
