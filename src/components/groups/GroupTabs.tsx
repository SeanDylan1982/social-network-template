import { Group } from '@/types/group';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Group as GroupIcon,
  Event as EventIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface GroupTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  group: Group;
}

const GroupTabs: React.FC<GroupTabsProps> = ({ activeTab, onTabChange, group }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
              },
            }}
          >
            <Tab 
              value="discussion" 
              label="Discussion" 
              icon={<ChatBubbleOutlineIcon />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              value="members" 
              label={`Members (${group.membersCount})`} 
              icon={<GroupIcon />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              value="events" 
              label={`Events (${group.eventsCount})`} 
              icon={<EventIcon />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              value="media" 
              label="Media" 
              icon={<PhotoLibraryIcon />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              value="about" 
              label="About" 
              icon={<InfoIcon />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
          </Tabs>
        </Box>
      </TabContext>
    </Paper>
  );
};

export default GroupTabs;
