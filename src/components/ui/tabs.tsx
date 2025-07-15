import React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs as MuiTabs, Tab as MuiTab, Box, useTheme } from '@mui/material';

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  '& .MuiTabs-scroller': {
    display: 'flex',
    gap: theme.spacing(2),
  },
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 40,
  minWidth: 'auto',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 'bold',
  transition: theme.transitions.create(['background-color', 'color']),
  '&.Mui-selected': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  sx?: any;
}

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  value: number;
  sx?: any;
}

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: number;
  index: number;
  sx?: any;
}

const Tabs: React.FC<TabsProps> = ({ children, value, onChange, sx }) => {
  const theme = useTheme();

  return (
    <StyledTabs
      value={value}
      onChange={onChange}
      sx={sx}
    >
      {children}
    </StyledTabs>
  );
};

const Tab: React.FC<TabProps> = ({ label, value, sx, ...props }) => {
  const theme = useTheme();

  return (
    <StyledTab
      value={value}
      label={label}
      sx={sx}
      {...props}
    />
  );
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, sx }) => {
  const theme = useTheme();

  return (
    <StyledTabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={sx}
    >
      {value === index && children}
    </StyledTabPanel>
  );
};

export { Tabs, Tab, TabPanel };
