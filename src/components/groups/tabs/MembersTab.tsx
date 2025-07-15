import { useState } from 'react';
import { GroupMember } from '@/types/group';
import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Paper,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  Mail as MailIcon,
  PersonRemove as PersonRemoveIcon,
  Shield as ShieldIcon,
  Gavel as GavelIcon,
  Block as BlockIcon,
} from '@mui/icons-material';

interface MembersTabProps {
  members: GroupMember[];
  isMember: boolean;
  groupId: string;
}

const MembersTab: React.FC<MembersTabProps> = ({ members, isMember, groupId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, member: GroupMember) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSendMessage = (memberId: string) => {
    // In a real app, this would open a chat with the member
    console.log(`Message member: ${memberId}`);
    handleMenuClose();
  };

  const handleMakeAdmin = (memberId: string) => {
    // In a real app, this would make the member an admin
    console.log(`Make admin: ${memberId}`);
    handleMenuClose();
  };

  const handleRemoveMember = (memberId: string) => {
    // In a real app, this would remove the member from the group
    console.log(`Remove member: ${memberId}`);
    handleMenuClose();
  };

  const handleBlockMember = (memberId: string) => {
    // In a real app, this would block the member
    console.log(`Block member: ${memberId}`);
    handleMenuClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" component="h2">
          {members.length} Members
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search members..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: { xs: 1, sm: 0 }, minWidth: 200 }}
          />
          
          {isMember && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PersonAddIcon />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Invite People
            </Button>
          )}
        </Box>
      </Box>
      
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {filteredMembers.length > 0 ? (
          <List disablePadding>
            {filteredMembers.map((member, index) => (
              <div key={member.id}>
                <ListItem 
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'action.hover',
                      '& .member-actions': { visibility: 'visible' }
                    },
                    pr: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={member.avatar} 
                      alt={member.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1" component="span">
                          {member.name}
                        </Typography>
                        {member.isAdmin && (
                          <Chip 
                            label="Admin" 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            icon={<ShieldIcon />}
                          />
                        )}
                        {member.isModerator && !member.isAdmin && (
                          <Chip 
                            label="Moderator" 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                            icon={<GavelIcon />}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        {member.title && (
                          <Typography variant="body2" component="div">
                            {member.title}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          Joined {formatDate(member.joinDate)}
                        </Typography>
                      </>
                    }
                    sx={{ mr: 2 }}
                  />
                  
                  <Box className="member-actions" sx={{ visibility: 'hidden' }}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, member)}
                      aria-label="more"
                      aria-controls="member-menu"
                      aria-haspopup="true"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                
                {index < filteredMembers.length - 1 && <Divider variant="inset" component="li" />}
              </div>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ color: 'text.secondary', mb: 2, '& svg': { fontSize: 60 } }}>
              <SearchIcon fontSize="inherit" />
            </Box>
            <Typography variant="h6" gutterBottom>
              No members found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {searchQuery 
                ? 'Try a different search term.' 
                : 'There are no members in this group yet.'}
            </Typography>
            {isMember && (
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PersonAddIcon />}
              >
                Invite People
              </Button>
            )}
          </Box>
        )}
      </Paper>
      
      {/* Member Menu */}
      <Menu
        id="member-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => selectedMember && handleSendMessage(selectedMember.id)}>
          <MailIcon sx={{ mr: 1 }} /> Send Message
        </MenuItem>
        
        {isMember && (
          <>
            <Divider />
            <MenuItem 
              onClick={() => selectedMember && handleMakeAdmin(selectedMember.id)}
              disabled={selectedMember?.isAdmin}
            >
              <ShieldIcon sx={{ mr: 1 }} /> Make Admin
            </MenuItem>
            <MenuItem 
              onClick={() => selectedMember && handleMakeAdmin(selectedMember.id)}
              disabled={selectedMember?.isModerator || selectedMember?.isAdmin}
            >
              <GavelIcon sx={{ mr: 1 }} /> Make Moderator
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={() => selectedMember && handleRemoveMember(selectedMember.id)}
              sx={{ color: 'error.main' }}
            >
              <PersonRemoveIcon sx={{ mr: 1 }} /> Remove from Group
            </MenuItem>
            <MenuItem 
              onClick={() => selectedMember && handleBlockMember(selectedMember.id)}
              sx={{ color: 'error.main' }}
            >
              <BlockIcon sx={{ mr: 1 }} /> Block Member
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default MembersTab;
