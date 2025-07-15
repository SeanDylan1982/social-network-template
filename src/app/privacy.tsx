import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Paper,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import Head from 'next/head';
import {
  Security as SecurityIcon,
  DataObject as DataIcon,
  Share as ShareIcon,
  Lock as LockIcon,
  Cookie as CookieIcon,
  Gavel as GavelIcon,
  Public as PublicIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'md',
  '& .privacy-paper': {
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
    '& .section-header': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
      '& .MuiListItemIcon-root': {
        minWidth: 40,
        '& .MuiSvgIcon-root': {
          fontSize: '1.5rem',
          color: theme.palette.primary.main,
        },
      },
      '& .section-title': {
        fontWeight: 600,
        color: theme.palette.text.primary,
      },
    },
    '& .MuiList-root': {
      padding: 0,
      '& .MuiListItem-root': {
        padding: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 36,
          '& .MuiSvgIcon-root': {
            fontSize: '1rem',
          },
        },
        '& .MuiTypography-root': {
          color: theme.palette.text.secondary,
        },
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

const PrivacyPage: React.FC = () => {
  const theme = useTheme();

  // POPIA Compliance Notice
  const popiaNotice = {
    title: "POPIA Compliance Notice",
    content: "This Privacy Policy complies with the Protection of Personal Information Act (POPIA) of South Africa. We ensure that all personal information is processed lawfully, fairly, and transparently, and that we implement appropriate security measures to protect your personal information."
  };

  // Cookies Notice
  const cookiesNotice = {
    title: "Cookies Notice",
    content: "We use cookies to enhance your experience on our website. By continuing to use our website, you consent to our use of cookies. You can manage your cookie preferences through your browser settings."
  };

  return (
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Privacy Policy | Social Network</title>
        <meta name="description" content="Read our Privacy Policy" />
      </Head>

      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <StyledContainer maxWidth="md">
          <Paper
            className="privacy-paper"
            sx={{
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }} className="section-header">
              <SecurityIcon
                sx={{
                  fontSize: 60,
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                className="MuiTypography-h3"
              >
                Privacy Policy
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Last Updated: July 11, 2023
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Section
              icon={<DataIcon />}
              title="1. Information We Collect"
              id="information"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                We collect information to provide better services to all our users. The information
                we collect includes:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Account information (name, email, profile photo)</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Content you create, upload, or receive</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Communication data (messages, comments, interactions)</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Usage data (how you use our services)</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Device information and location data</Typography>
                </ListItem>
              </List>
            </Section>

            {/* POPIA Notice Section */}
            <Section
              icon={<GavelIcon />}
              title={popiaNotice.title}
              id="popia"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                {popiaNotice.content}
              </Typography>
            </Section>

            <Divider sx={{ my: 4 }} />

            {/* Cookies Notice Section */}
            <Section
              icon={<CookieIcon />}
              title={cookiesNotice.title}
              id="cookies"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                {cookiesNotice.content}
              </Typography>
            </Section>

            <Divider sx={{ my: 4 }} />

            {/* How We Use Your Information Section */}
            <Section
              icon={<ShareIcon />}
              title="2. How We Use Your Information"
              id="usage"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                We use the information we collect to:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Provide, maintain, and improve our services</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Develop new features and functionality</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Personalize content and make suggestions for you</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Measure and understand the effectiveness of our services</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Communicate with you about updates and security alerts</Typography>
                </ListItem>
              </List>
            </Section>

            <Section
              icon={<LockIcon />}
              title="3. Data Security"
              id="security"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized or unlawful processing, accidental loss,
                destruction, or damage. These measures include:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Encryption of data in transit and at rest</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Regular security assessments and testing</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Access controls and authentication procedures</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Staff training on data protection</Typography>
                </ListItem>
              </List>
            </Section>

            <Section
              icon={<CookieIcon />}
              title="4. Cookies and Similar Technologies"
              id="cookies"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                We use cookies and similar technologies to provide and improve our services. You can
                manage your cookie preferences through your browser settings. For more information,
                please see our{' '}
                <Link 
                  href="/cookie-policy"
                  className="MuiTypography-body1"
                  color="primary"
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Cookie Policy
                </Link>.
              </Typography>
            </Section>

            <Section
              icon={<GavelIcon />}
              title="5. Your Rights and Choices"
              id="rights"
              className="section-header"
            >
              <Typography variant="body1" paragraph>
                You have certain rights regarding your personal information, including:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Access to your personal information</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Correction of inaccurate information</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Deletion of your personal data</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Restriction or objection to processing</Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>•</ListItemIcon>
                  <Typography>Data portability</Typography>
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                To exercise these rights, please contact us using the information below.
              </Typography>
            </Section>

            <Section
              icon={<PublicIcon />}
              title="6. International Data Transfers"
              id="international"
            >
              <Typography variant="body1" paragraph>
                Your information may be transferred to, stored, and processed in countries other than
                the country in which you reside. We ensure appropriate safeguards are in place to
                protect your personal information in accordance with this Privacy Policy.
              </Typography>
            </Section>

            <Section
              icon={<EmailIcon />}
              title="7. Contact Us"
              id="contact"
            >
              <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy or our data practices, please
                contact us at:
              </Typography>
              <Typography variant="body1" paragraph>
                Email:{' '}
                <Link href="mailto:privacy@socialnetwork.com" color="primary">
                  privacy@socialnetwork.com
                </Link>
                <br />
                Address: 123 Privacy Street, Data City, DC 12345, United States
              </Typography>
            </Section>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 6, fontStyle: 'italic' }}>
              Note: This Privacy Policy may be updated from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the "Last Updated"
              date at the top of this Privacy Policy.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

// Reusable Section component with icon
const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  id: string;
  children: React.ReactNode;
}> = ({ icon, title, id, children }) => (
  <Box id={id} sx={{ mb: 6 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box
        sx={{
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: 600, color: 'primary.main' }}
      >
        {title}
      </Typography>
    </Box>
    <Box sx={{ pl: 8 }}>{children}</Box>
  </Box>
);

export default PrivacyPage;
