import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Group } from '@/types/group';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';

interface GroupCardProps {
  group: Group;
  onJoin?: (groupId: string) => void;
  onView?: (groupId: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onJoin, onView }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => onView?.(group.id)}>
        <CardMedia
          component="div"
          sx={{
            pt: '30%',
            position: 'relative',
            backgroundImage: `url(${group.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: 16,
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid white',
              backgroundImage: `url(${group.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: 'background.paper',
            }}
          />
        </CardMedia>
        <CardContent sx={{ mt: 4 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h6" component="div" noWrap>
              {group.name}
            </Typography>
            {group.isPrivate ? (
              <LockIcon color="action" fontSize="small" sx={{ ml: 1 }} />
            ) : (
              <PublicIcon color="action" fontSize="small" sx={{ ml: 1 }} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" noWrap>
            {group.category}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <PeopleIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {group.membersCount.toLocaleString()} members
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box p={2} pt={0} mt="auto">
        {group.isMember ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => onView?.(group.id)}
          >
            View Group
          </Button>
        ) : (
          <Button
            fullWidth
            variant={group.joinRequestPending ? 'outlined' : 'contained'}
            color="primary"
            onClick={() => onJoin?.(group.id)}
            disabled={group.joinRequestPending}
          >
            {group.joinRequestPending ? 'Request Sent' : 'Join Group'}
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default GroupCard;
