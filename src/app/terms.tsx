import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import Head from 'next/head';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'md',
  '& .terms-paper': {
    padding: theme.spacing(6),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    '&:hover': {
      boxShadow: theme.shadows[6],
      transform: 'translateY(-2px)',
      transition: theme.transitions.create(['box-shadow', 'transform']),
    },
    '& .MuiTypography-h3': {
      fontWeight: 700,
      marginBottom: theme.spacing(4),
      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    '& .MuiTypography-subtitle1': {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(4),
    },
    '& .MuiDivider-root': {
      margin: `${theme.spacing(4)} 0`,
    },
    '& .section-title': {
      fontWeight: 600,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      color: theme.palette.primary.main,
      fontSize: '1.25rem',
    },
    '& ul': {
      paddingLeft: theme.spacing(4),
      marginBottom: theme.spacing(3),
      '& li': {
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
      },
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      fontWeight: 600,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

const TermsPage: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Terms of Service | Social Network</title>
        <meta name="description" content="Read our Terms of Service" />
      </Head>

      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <StyledContainer maxWidth="md">
          <Paper
            className="terms-paper"
            sx={{
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              className="MuiTypography-h3"
            >
              Terms of Service
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" paragraph>
              Last Updated: July 11, 2023
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Section title="1. Acceptance of Terms" id="acceptance">
              <Typography variant="body1" paragraph>
                By accessing or using our services, you agree to be bound by these Terms of Service
                and our Privacy Policy. If you do not agree to these terms, please do not use our
                services.
              </Typography>
            </Section>

            <Section title="2. User Accounts" id="accounts">
              <Typography variant="body1" paragraph>
                You are responsible for maintaining the confidentiality of your account and password
                and for restricting access to your computer. You agree to accept responsibility for
                all activities that occur under your account.
              </Typography>
            </Section>

            <Section title="3. User Conduct" id="conduct">
              <Typography variant="body1" paragraph>
                You agree not to use the service to:
              </Typography>
              <ul className="MuiTypography-body1">
                <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
                <li>Violate any applicable local, state, national, or international law</li>
              </ul>
            </Section>

            <Section title="4. Intellectual Property" id="ip">
              <Typography variant="body1" paragraph>
                All content included on the platform, such as text, graphics, logos, button icons,
                images, audio clips, digital downloads, data compilations, and software, is the
                property of our company or its content suppliers and protected by international
                copyright laws.
              </Typography>
            </Section>

            <Section title="5. Termination" id="termination">
              <Typography variant="body1" paragraph>
                We may terminate or suspend your account and bar access to the service immediately,
                without prior notice or liability, under our sole discretion, for any reason
                whatsoever and without limitation, including but not limited to a breach of the
                Terms.
              </Typography>
            </Section>

            <Section title="6. Limitation of Liability" id="liability">
              <Typography variant="body1" paragraph>
                In no event shall we be liable for any indirect, incidental, special, consequential,
                or punitive damages, including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses, resulting from your access to or use of or
                inability to access or use the service.
              </Typography>
            </Section>

            <Section title="7. Changes to Terms" id="changes">
              <Typography variant="body1" paragraph>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any
                time. We will provide notice of any changes by posting the new Terms on this page.
              </Typography>
            </Section>

            <Section title="8. Contact Us" id="contact">
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms, please contact us at{' '}
                <Link 
                  href="mailto:legal@socialnetwork.com"
                  className="MuiDivider-root"
                  color={theme.palette.primary.main}
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  legal@socialnetwork.com
                </Link>.
              </Typography>
            </Section>
          </Paper>
        </StyledContainer>
      </Box>
    </>
  );
};

// Reusable Section component
const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({
  title,
  id,
  children,
}) => (
  <Box id={id} sx={{ mb: 4 }}>
    <Typography
      variant="h5"
      component="h2"
      gutterBottom
      className="section-title"
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default TermsPage;
