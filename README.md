# Social Network Template

A modern, responsive social network template built with Next.js, TypeScript, and Material-UI. This template provides a solid foundation for building feature-rich social networking applications with a clean, user-friendly interface.

![Social Network Preview](public/images/social-network-preview.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production](#production)
- [Project Structure](#project-structure)
- [Component Library](#component-library)
- [State Management](#state-management)
- [Theming](#theming)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Testing](#testing)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login, registration, and password recovery with role-based access control (RBAC)
- **Admin Dashboard**: Comprehensive admin interface for user and content management
  - User management (view, search, filter, suspend, promote, edit)
  - Post management (view, delete, flag, moderate, filter)
  - Site configuration and settings
  - Real-time analytics and metrics
  - Audit logs for all admin actions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Built-in theme switching with system preference detection
- **Real-time Updates**: WebSocket integration for live notifications, messages, and admin alerts
- **Rich Media Support**: Upload and display images, videos, and documents with previews
- **Interactive UI**: Like, comment, share, and follow functionality with real-time updates
- **Comprehensive Help Center**: Built-in documentation and support with search functionality
- **Accessibility**: WCAG 2.1 AA compliant components with keyboard navigation
- **Performance Optimized**: Code splitting, lazy loading, and image optimization
- **Bulk Actions**: Perform actions on multiple items at once (users, posts, etc.)

## Tech Stack

- **Frontend Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript 5+
- **UI Library**: Material-UI (MUI) v6+ with custom theme
- **State Management**: React Query + Zustand for client state
- **Form Handling**: React Hook Form + Yup validation
- **Styling**: Emotion (CSS-in-JS) with SASS modules
- **Routing**: Next.js App Router with protected routes
- **API**: Next.js API Routes with middleware
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with JWT and session management
- **Authorization**: Role-based access control (RBAC)
- **Real-time**: Socket.IO for live updates
- **Admin Dashboard**: Custom admin interface with data tables and bulk actions
- **Testing**: 
  - Unit Tests: Jest + React Testing Library
  - E2E Tests: Cypress
  - API Tests: Supertest
- **Linting/Formatting**: ESLint, Prettier, Husky pre-commit hooks
- **Performance**: Bundle analysis, code splitting, and lazy loading

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later / yarn 1.22.0 or later
- MongoDB 6.0 or later (or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-network-template.git
   cd social-network-template
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   npm install
   # or
   yarn

   # Install backend dependencies
   cd backend
   npm install
   # or
   yarn
   cd ..
   ```

3. Set up environment variables:
   ```bash
   # Frontend
   cp .env.example .env.local
   
   # Backend
   cd backend
   cp .env.example .env
   cd ..
   ```
   Update the values in both `.env.local` and `backend/.env` with your configuration.

4. Start the development servers:
   ```bash
   # In the root directory
   npm run dev
   # or
   yarn dev
   
   # In a separate terminal, start the backend server
   cd backend
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.
   - Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
   - API documentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Development

- Run development server: `npm run dev` (starts both frontend and backend with hot reload)
- Run backend only: `cd backend && npm run dev`
- Run frontend only: `npm run dev:frontend`
- Build for production: `npm run build`
- Start production server: `npm start`

### Admin Setup

1. After starting the application, create an admin user using the following command:
   ```bash
   cd backend
   node scripts/createAdminUser.js
   ```
   
2. Or manually set a user as admin by updating the database:
   ```bash
   cd backend
   node scripts/updateAdminStatus.js --email=admin@example.com --role=admin
   ```

3. Log in with admin credentials to access the admin dashboard at `/admin`
- Start production server: `npm start`
- Lint code: `npm run lint`
- Format code: `npm run format`
- Run tests: `npm test`

### Production

For production deployment, follow these steps:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   │   ├── home/          # Home feed
│   │   ├── profile/       # User profiles
│   │   ├── messages/      # Direct messages
│   │   └── settings/      # User settings
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── common/            # Common UI elements
│   ├── layout/            # Layout components
│   ├── posts/             # Post-related components
│   ├── users/             # User-related components
│   └── videos/            # Video components
├── config/                # Configuration files
├── constants/             # Application constants
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── models/                # Database models
├── public/                # Static files
├── services/              # API services
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## Component Library

The project includes a comprehensive set of reusable components:

- **UI Elements**: Buttons, inputs, modals, cards, etc.
- **Layout**: Grid system, containers, sections
- **Navigation**: Header, sidebar, tabs, breadcrumbs
- **Content**: Post cards, comments, notifications
- **Form Elements**: Input fields, selectors, date pickers
- **Feedback**: Loaders, alerts, snackbars
- **Media**: Image gallery, video player, audio player

## State Management

The application uses a combination of React Context, Zustand, and React Query for state management:

- **React Context**: For global UI state (theme, auth, etc.)
- **Zustand**: For client-side global state
- **React Query**: For server state and data fetching
- **Form State**: React Hook Form for form state management

## Theming

The application uses Material-UI's theming system with the following customizations:

- **Color Schemes**: Light and dark mode support
- **Typography**: Custom font stack and type scale
- **Spacing**: 8px baseline grid
- **Breakpoints**: Mobile-first responsive design
- **Custom Components**: Extended MUI components with app-specific styles

## Routing

The application uses Next.js App Router with the following routing structure:

- `/` - Home feed
- `/login` - User login
- `/register` - User registration
- `/profile/[username]` - User profiles
- `/settings` - User settings
- `/messages` - Direct messages
- `/notifications` - User notifications
- `/help` - Help center
- `/explore` - Explore content
- `/bookmarks` - Saved items

## API Integration

The application includes a set of API routes for handling data operations:

- **Authentication**: Login, registration, password reset
- **Users**: Profile management, follow/unfollow
- **Posts**: Create, read, update, delete posts
- **Comments**: Add, remove, like comments
- **Messages**: Send and receive direct messages
- **Notifications**: Real-time notifications

## Authentication

Authentication is handled using NextAuth.js with the following features:

- Email/password authentication
- Social logins (Google, Facebook, Twitter, GitHub)
- JWT-based sessions
- Password reset flow
- Email verification
- Role-based access control

## Testing

The application includes the following test suites:

- **Unit Tests**: Jest + React Testing Library
- **Component Tests**: React Testing Library
- **E2E Tests**: Cypress
- **API Tests**: Jest + Supertest

To run tests:

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run component tests
npm run test:components

# Run E2E tests
npm run test:e2e
```

## Performance

The application includes several performance optimizations:

- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components and images loaded on demand
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Performance Monitoring**: Built-in metrics collection

## Accessibility

The application is built with accessibility in mind:

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Color contrast checking

## Internationalization

The application supports multiple languages using next-intl:

- English (default)
- Spanish
- French
- German
- More languages can be easily added

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import the repository on Vercel
3. Set up environment variables
4. Deploy!

### Docker

1. Build the Docker image:
   ```bash
   docker build -t social-network .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 social-network
   ```

### Other Platforms

The application can also be deployed to:
- Netlify
- AWS Amplify
- Heroku
- DigitalOcean App Platform

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Additional Documentation

For more detailed documentation, please see the [docs](docs/) directory.

## Support

For support, please open an issue in the GitHub repository or contact support@example.com.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

© 2025 Social Network Template. All rights reserved.
