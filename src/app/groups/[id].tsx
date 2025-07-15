import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Group, GroupMember, GroupPost, GroupEvent } from '@/types/group';

// Components
import GroupHeader from '@/components/groups/GroupHeader';
import GroupTabs from '@/components/groups/GroupTabs';
import DiscussionTab from '@/components/groups/tabs/DiscussionTab';
import MembersTab from '@/components/groups/tabs/MembersTab';
import EventsTab from '@/components/groups/tabs/EventsTab';
import MediaTab from '@/components/groups/tabs/MediaTab';
import AboutTab from '@/components/groups/tabs/AboutTab';
import { Container, Box, Paper, Skeleton } from '@mui/material';

// Mock data - replace with API calls
import { mockGroup, mockMembers, mockPosts, mockEvents } from '@/mocks/groupMocks';

const GroupDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [group, setGroup] = useState<Group | null>(null);
  const [activeTab, setActiveTab] = useState('discussion');
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [events, setEvents] = useState<GroupEvent[]>([]);

  // Fetch group data
  useEffect(() => {
    const fetchGroupData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setGroup(mockGroup);
        setPosts(mockPosts);
        setMembers(mockMembers);
        setEvents(mockEvents);
        setIsMember(mockGroup.isMember);
        setIsAdmin(mockGroup.isAdmin);
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchGroupData();
    }
  }, [id]);

  const handleJoinGroup = () => {
    setIsMember(true);
    // In a real app, make an API call to join the group
  };

  const handleLeaveGroup = () => {
    setIsMember(false);
    setIsAdmin(false);
    // In a real app, make an API call to leave the group
  };

  const handleCreatePost = (content: string) => {
    const newPost: GroupPost = {
      id: `post${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: '/images/avatars/current-user.jpg',
      },
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      isLiked: false,
      isSaved: false,
    };
    setPosts([newPost, ...posts]);
    // In a real app, make an API call to create the post
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    // In a real app, make an API call to like/unlike the post
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2, mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 2 }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      </Container>
    );
  }

  if (!group) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Group not found
        </Typography>
        <Button variant="contained" onClick={() => router.push('/groups')}>
          Browse Groups
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{group.name} | Social Network</title>
        <meta name="description" content={group.description} />
      </Head>

      <GroupHeader 
        group={group} 
        isMember={isMember} 
        isAdmin={isAdmin} 
        onJoin={handleJoinGroup} 
        onLeave={handleLeaveGroup} 
      />
      
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 2 }}>
            <GroupTabs 
              activeTab={activeTab} 
              onTabChange={(tab) => setActiveTab(tab)} 
              group={group} 
            />
            
            {activeTab === 'discussion' && (
              <DiscussionTab 
                posts={posts} 
                isMember={isMember} 
                onCreatePost={handleCreatePost} 
                onLikePost={handleLikePost} 
              />
            )}
            
            {activeTab === 'members' && (
              <MembersTab 
                members={members} 
                isMember={isMember} 
                groupId={group.id} 
              />
            )}
            
            {activeTab === 'events' && (
              <EventsTab 
                events={events} 
                isMember={isMember} 
                groupId={group.id} 
              />
            )}
            
            {activeTab === 'media' && <MediaTab groupId={group.id} />}
            {activeTab === 'about' && <AboutTab group={group} />}
          </Box>
          
          {/* Sidebar */}
          <Box sx={{ width: { xs: '100%', md: 350 }, flexShrink: 0 }}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {group.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {group.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Link href={group.website} target="_blank" rel="noopener noreferrer">
                      {group.website.replace(/^https?:\/\//, '')}
                    </Link>
                  </Box>
                )}
                
                {group.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <span>{group.location}</span>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <span>{group.membersCount.toLocaleString()} members</span>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <span>{group.eventsCount} upcoming events</span>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                </Box>
              </Box>
              
              {group.rules && group.rules.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Group Rules
                  </Typography>
                  <List dense>
                    {group.rules.map((rule, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordIcon fontSize="small" sx={{ fontSize: '0.5rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={rule} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
            
            {group.tags && group.tags.length > 0 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {group.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      variant="outlined"
                      onClick={() => {}}
                    />
                  ))}
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default GroupDetailPage;
