# Component Library Documentation

This document provides comprehensive documentation for all reusable components in the Social Network Template.

## Table of Contents

- [Component Principles](#component-principles)
- [Component List](#component-list)
- [Component API](#component-api)
  - [Common Props](#common-props)
  - [Layout Components](#layout-components)
  - [UI Components](#ui-components)
  - [Form Components](#form-components)
  - [Data Display Components](#data-display-components)
  - [Feedback Components](#feedback-components)
  - [Navigation Components](#navigation-components)
  - [Media Components](#media-components)
  - [Utility Components](#utility-components)
- [Component Patterns](#component-patterns)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Testing](#testing)

## Component Principles

1. **Single Responsibility**: Each component should do one thing well.
2. **Composition**: Build complex UIs from simple, reusable components.
3. **Controlled/Uncontrolled**: Support both controlled and uncontrolled usage where appropriate.
4. **Accessibility**: All components should be accessible by default.
5. **Responsive**: Components should work on all screen sizes.
6. **Consistent API**: Similar components should have similar APIs.
7. **Documentation**: All components should be well-documented with examples.

## Component List

### Layout Components

- **Container**: Wrapper component for constraining content width
- **Grid**: Responsive grid layout system
- **Stack**: Vertical or horizontal layout with consistent spacing
- **Box**: Generic container with styling props
- **Divider**: Horizontal or vertical divider line
- **Spacer**: Empty space for layout

### UI Components

#### Buttons
- **Button**: Standard button component
- **IconButton**: Button with an icon
- **ButtonGroup**: Group related buttons
- **FloatingActionButton**: Prominent action button

#### Inputs
- **TextField**: Text input field
- **Select**: Dropdown selection
- **Checkbox**: Toggle option
- **Radio**: Single selection from options
- **Switch**: Toggle switch
- **Slider**: Range selection
- **Autocomplete**: Input with suggestions

#### Data Display
- **Avatar**: User avatar image
- **Badge**: Small status indicator
- **Chip**: Compact element for input, attribute, or action
- **Table**: Data table with sorting and pagination
- **List**: Vertical list of items
- **Tooltip**: Informative text on hover
- **Typography**: Text display components

#### Feedback
- **Alert**: Important feedback message
- **Snackbar**: Brief notification at the bottom of the screen
- **Dialog**: Modal dialog
- **Progress**: Loading indicator
- **Skeleton**: Content placeholder for loading states

#### Navigation
- **AppBar**: Top app bar
- **Drawer**: Side navigation panel
- **Breadcrumbs**: Navigation path
- **Tabs**: Tabbed navigation
- **Pagination**: Page navigation
- **Stepper**: Multi-step progress indicator

### Media
- **Image**: Responsive image with lazy loading
- **Video**: Video player
- **Audio**: Audio player
- **Carousel**: Image/media carousel
- **MediaGallery**: Grid of media items

## Component API

### Common Props

Most components accept these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | object | `{}` | Custom styles using the theme |
| `className` | string | - | Additional CSS class name |
| `style` | object | - | Inline styles |
| `id` | string | - | DOM ID |
| `onClick` | function | - | Click handler |
| `onMouseEnter` | function | - | Mouse enter handler |
| `onMouseLeave` | function | - | Mouse leave handler |
| `component` | ElementType | - | Custom component/element to render |
| `ref` | Ref | - | Ref to the root element |
| `children` | ReactNode | - | Child elements |

### Button Component

```jsx
import { Button } from '@/components/common/Button';

<Button 
  variant="contained" 
  color="primary"
  size="medium"
  fullWidth={false}
  disabled={false}
  startIcon={<Icon />}
  endIcon={<Icon />}
  onClick={() => {}}
>
  Click me
</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | 'text' \| 'outlined' \| 'contained' | 'text' | Button variant |
| `color` | 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success' | 'primary' | Button color |
| `size` | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| `fullWidth` | boolean | false | Full width button |
| `disabled` | boolean | false | Disable the button |
| `startIcon` | ReactNode | - | Icon before text |
| `endIcon` | ReactNode | - | Icon after text |
| `loading` | boolean | false | Show loading state |
| `type` | 'button' \| 'submit' \| 'reset' | 'button' | Button type |
| `href` | string | - | Link URL (renders as `<a>`) |

### Card Component

```jsx
import { Card, CardHeader, CardContent, CardActions } from '@/components/common/Card';

<Card>
  <CardHeader 
    title="Card Title"
    subheader="Card Subheader"
    avatar={<Avatar>A</Avatar>}
    action={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
  />
  <CardMedia
    component="img"
    height="140"
    image="/image.jpg"
    alt="Card media"
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      Card content goes here
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
</Card>
```

**Props:**

| Component | Key Props |
|-----------|-----------|
| `Card` | `raised`, `square`, `variant` |
| `CardHeader` | `title`, `subheader`, `avatar`, `action` |
| `CardMedia` | `component`, `image`, `alt`, `height` |
| `CardContent` | - |
| `CardActions` | `disableSpacing` |

## Component Patterns

### Controlled vs Uncontrolled Components

Most form components can be used in controlled or uncontrolled mode:

```jsx
// Controlled
const [value, setValue] = useState('');
<TextField 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Uncontrolled
<TextField 
  defaultValue="Initial value"
  inputRef={inputRef}
/>
```

### Compound Components

Some components use the compound component pattern for better composition:

```jsx
<List>
  <ListItem>
    <ListItemIcon><InboxIcon /></ListItemIcon>
    <ListItemText primary="Inbox" secondary="Jan 9, 2020" />
  </ListItem>
  <ListItem>
    <ListItemIcon><DraftsIcon /></ListItemIcon>
    <ListItemText primary="Drafts" secondary="Draft messages" />
  </ListItem>
</List>
```

### Render Props

Some components accept render props for custom rendering:

```jsx
<Autocomplete
  options={options}
  getOptionLabel={(option) => option.title}
  renderInput={(params) => (
    <TextField {...params} label="Search" variant="outlined" />
  )}
  renderOption={(props, option) => (
    <li {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={option.avatar} sx={{ mr: 2 }} />
        <Box>
          <Typography>{option.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {option.description}
          </Typography>
        </Box>
      </Box>
    </li>
  )}
/>
```

## Theming

All components use the theme for consistent styling. You can customize the theme in `src/theme/theme.ts`.

### Theme Variables

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    // ...
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    // ...
  },
  spacing: 8, // 8px base unit
  shape: {
    borderRadius: 4,
  },
  // ...
});
```

### Using Theme in Components

```jsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      padding: theme.spacing(2), // 16px (8 * 2)
      color: theme.palette.primary.main,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4), // 32px on medium screens and up
      },
    }}>
      Content
    </Box>
  );
}
```

## Accessibility

All components follow WAI-ARIA authoring practices. Key accessibility features:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA attributes and roles
- **Focus Management**: Logical focus order and visible focus indicators
- **Color Contrast**: Meets WCAG 2.1 AA contrast requirements
- **Reduced Motion**: Respects user's motion preferences

### Accessibility Testing

Components are tested with:
- Screen readers (NVDA, VoiceOver, JAWS)
- Keyboard navigation
- Color contrast checkers
- Axe DevTools

## Performance

### Code Splitting

Components are code-split using dynamic imports:

```jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### Memoization

Use `React.memo` for expensive components:

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Component implementation
});
```

### Virtualization

For long lists, use virtualization:

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <List
      height={400}
      width="100%"
      itemSize={46}
      itemCount={items.length}
      itemData={items}
    >
      {({ index, style, data }) => (
        <ListItem style={style} key={index}>
          <ListItemText primary={data[index].name} />
        </ListItem>
      )}
    </List>
  );
}
```

## Testing

Components are tested with React Testing Library and Jest.

### Test Structure

```
__tests__/
  components/
    Button/
      Button.test.tsx
      Button.test.axe.tsx
    __snapshots__/
      Button.test.tsx.snap
```

### Example Test

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-root');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Testing

```jsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from './Button';

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Component Development

### Creating a New Component

1. Create a new directory in `src/components`
2. Create the component file (e.g., `MyComponent.tsx`)
3. Create an index file (`index.ts`) for exports
4. Add TypeScript types (`types.ts` if needed)
5. Add tests (`__tests__/MyComponent.test.tsx`)
6. Add stories (`MyComponent.stories.tsx`)
7. Update the component documentation

### Component Template

```tsx
import React from 'react';
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material';

interface MyComponentProps {
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * Custom styles
   */
  sx?: SxProps<Theme>;
  /**
   * Click handler
   */
  onClick?: () => void;
  // Add other props as needed
}

const StyledDiv = styled('div')(({ theme }) => ({
  // Default styles
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  // Add more styles as needed
}));

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ children, sx, onClick, ...other }, ref) => {
    return (
      <StyledDiv 
        ref={ref}
        onClick={onClick}
        sx={sx}
        {...other}
      >
        {children}
      </StyledDiv>
    );
  }
);

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

## Storybook

Components are documented in Storybook with:

- Multiple examples (stories)
- Interactive controls
- Documentation (JSDoc comments)
- Accessibility testing
- Visual testing

### Running Storybook

```bash
npm run storybook
```

### Example Story

```jsx
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component for user interaction.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
      description: 'The variant to use.',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the component.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the button will take up the full width of its container.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Secondary',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
```

## Contributing

1. Follow the [Component Principles](#component-principles)
2. Write tests for new components
3. Document props with JSDoc
4. Add stories for visual testing
5. Ensure accessibility compliance
6. Update this documentation if needed

## Resources

- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)
- [Testing Library](https://testing-library.com/)
- [Storybook Documentation](https://storybook.js.org/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
