import { Group } from '@/types/group';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Chip,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  LocationOn as LocationOnIcon,
  Public as PublicIcon,
  CalendarToday as CalendarIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  Tag as TagIcon,
  Gavel as GavelIcon,
  Shield as ShieldIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface AboutTabProps {
  group: Group;
}

const AboutTab: React.FC<AboutTabProps> = ({ group }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Custom components for ReactMarkdown
  const components = {
    h1: ({ node, ...props }: any) => (
      <Typography variant="h5" component="h2" gutterBottom {...props} />
    ),
    h2: ({ node, ...props }: any) => (
      <Typography variant="h6" component="h3" gutterBottom {...props} />
    ),
    h3: ({ node, ...props }: any) => (
      <Typography variant="subtitle1" component="h4" gutterBottom {...props} />
    ),
    p: ({ node, ...props }: any) => (
      <Typography variant="body1" paragraph {...props} />
    ),
    a: ({ node, ...props }: any) => (
      <Link href={props.href} target="_blank" rel="noopener noreferrer" color="primary">
        {props.children}
      </Link>
    ),
    ul: ({ node, ...props }: any) => (
      <List dense disablePadding sx={{ pl: 2, mb: 2 }} {...props} />
    ),
    li: ({ node, ...props }: any) => (
      <ListItem disableGutters sx={{ py: 0.5, display: 'list-item', listStyleType: 'disc' }}>
        <ListItemText primary={props.children} />
      </ListItem>
    ),
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <Grid container spacing={3}>
      {/* Main Content */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              About This Group
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<EditIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Edit Description
            </Button>
          </Box>
          
          {group.longDescription ? (
            <Box sx={{ '& p': { mb: 2 }, '& h2': { mt: 3, mb: 1.5 }, '& h3': { mt: 2.5, mb: 1 } }}>
              <ReactMarkdown components={components}>
                {group.longDescription}
              </ReactMarkdown>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No description available for this group.
            </Typography>
          )}
          
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<EditIcon />}
            fullWidth
            sx={{ mt: 2, display: { sm: 'none' } }}
          >
            Edit Description
          </Button>
        </Paper>
        
        {group.rules && group.rules.length > 0 && (
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Group Rules
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<GavelIcon />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                Suggest a Rule
              </Button>
            </Box>
            
            <List disablePadding>
              {group.rules.map((rule, index) => (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Box sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<GavelIcon />}
              fullWidth
              sx={{ mt: 2, display: { sm: 'none' } }}
            >
              Suggest a Rule
            </Button>
          </Paper>
        )}
        
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Group Admins
          </Typography>
          
          <Grid container spacing={2}>
            {group.admins && group.admins.length > 0 ? (
              group.admins.map((admin) => (
                <Grid item xs={12} sm={6} key={admin.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={admin.avatar} 
                      alt={admin.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2">{admin.name}</Typography>
                        <Chip 
                          label="Admin" 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          icon={<ShieldIcon fontSize="small" />}
                          sx={{ height: 20, '& .MuiChip-icon': { mr: 0.5 } }}
                        />
                      </Box>
                      {admin.title && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {admin.title}
                        </Typography>
                      )}
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<PersonIcon />}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  No admin information available.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
      
      {/* Sidebar */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Group Info
          </Typography>
          
          <List disablePadding>
            <ListItem disableGutters sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText 
                primary={`${group.membersCount.toLocaleString()} members`} 
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            
            <ListItem disableGutters sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                {group.isPrivate ? <LockIcon /> : <PublicIcon />}
              </ListItemIcon>
              <ListItemText 
                primary={group.isPrivate ? 'Private Group' : 'Public Group'} 
                secondary={group.isPrivate ? 'Only members can see who\'s in the group and what they post.' : 'Anyone can see who\'s in the group and what they post.'}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
            
            {group.location && (
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={group.location} 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            )}
            
            {group.website && (
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Link href={group.website} target="_blank" rel="noopener noreferrer" color="primary">
                      {group.website.replace(/^https?:\/\//, '')}
                    </Link>
                  } 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            )}
            
            <ListItem disableGutters sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText 
                primary={`Created on ${formatDate(group.createdAt)}`} 
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            
            {group.category && (
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={group.category} 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            )}
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Group Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {group.tags && group.tags.length > 0 ? (
                group.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small" 
                    variant="outlined"
                    onClick={() => {}}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No tags available.
                </Typography>
              )}
            </Box>
            
            <Button 
              variant="text" 
              size="small" 
              startIcon={<TagIcon />}
              sx={{ mt: 1 }}
            >
              Suggest a Tag
            </Button>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Related Groups
          </Typography>
          
          <List disablePadding>
            {[1, 2, 3].map((item) => (
              <ListItem key={item} disableGutters sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar 
                    src={`/images/groups/group-${item}.jpg`}
                    alt={`Related Group ${item}`}
                    sx={{ width: 48, height: 48 }}
                  >
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={`Related Group ${item}`}
                  secondary={`${Math.floor(Math.random() * 1000).toLocaleString()} members`}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ ml: 1, whiteSpace: 'nowrap' }}
                >
                  Join
                </Button>
              </ListItem>
            ))}
          </List>
          
          <Button 
            variant="text" 
            size="small" 
            fullWidth
            sx={{ mt: 1 }}
          >
            See More
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutTab;
