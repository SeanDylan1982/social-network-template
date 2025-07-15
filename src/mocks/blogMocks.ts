import { BlogPost } from '../types/blog.types';

// Helper function to generate mock IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

export const mockBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Getting Started with Modern Web Development',
    excerpt: 'Learn the fundamentals of modern web development with this comprehensive guide.',
    content: `# Getting Started with Modern Web Development

## Introduction
Welcome to the world of modern web development! In this comprehensive guide, we'll cover everything you need to know to get started with building modern web applications.

## The Basics
Modern web development involves several key technologies:
- HTML5
- CSS3
- JavaScript (ES6+)
- Frontend frameworks (React, Vue, Angular)
- Backend technologies (Node.js, Python, Ruby, etc.)

## Setting Up Your Environment
1. Install a code editor (VS Code, Sublime Text, etc.)
2. Set up version control with Git
3. Install Node.js and npm
4. Choose a package manager (npm, yarn, or pnpm)

## Building Your First App
Let's create a simple React application...

## Conclusion
Web development is an exciting field with endless possibilities. Keep learning and building!`,
    category: 'web-development',
    tags: ['web', 'beginners', 'tutorial'],
    featuredImage: '/images/blog/web-dev.jpg',
    slug: 'getting-started-with-modern-web-development',
    isPublished: true,
    author: {
      id: generateId(),
      name: 'Alex Johnson',
      avatar: '/images/avatars/avatar1.jpg'
    },
    stats: {
      views: 1240,
      likes: 124,
      comments: 28,
      bookmarks: 56
    },
    readingTime: 5,
    createdAt: '2025-07-10T10:00:00Z',
    updatedAt: '2025-07-10T10:00:00Z',
    publishedAt: '2025-07-10T10:00:00Z',
  },
  {
    _id: '2',
    title: 'The Future of Artificial Intelligence',
    excerpt: 'Exploring the latest trends and future possibilities in AI technology.',
    content: `# The Future of Artificial Intelligence

## Introduction
Artificial Intelligence is transforming our world at an unprecedented pace. In this article, we'll explore what the future holds for AI.

## Current State of AI
- Machine learning advancements
- Natural language processing
- Computer vision
- Robotics

## Future Possibilities
1. General AI
2. AI in healthcare
3. Autonomous systems
4. Ethical considerations

## Challenges Ahead
- Data privacy
- Job displacement
- Algorithmic bias
- Regulation and governance

## Conclusion
The future of AI is both exciting and challenging. As we move forward, it's crucial to develop AI responsibly.`,
    category: 'artificial-intelligence',
    tags: ['ai', 'machine-learning', 'future-tech'],
    featuredImage: '/images/blog/ai-future.jpg',
    slug: 'future-of-artificial-intelligence',
    isPublished: true,
    author: {
      id: generateId(),
      name: 'Sarah Chen',
      avatar: '/images/avatars/avatar2.jpg'
    },
    stats: {
      views: 890,
      likes: 89,
      comments: 15,
      bookmarks: 42
    },
    readingTime: 8,
    createdAt: '2025-07-08T14:30:00Z',
    updatedAt: '2025-07-08T14:30:00Z',
    publishedAt: '2025-07-08T14:30:00Z',
  },
  {
    _id: '3',
    title: 'Mastering TypeScript in 2025',
    excerpt: 'Advanced TypeScript patterns and best practices for modern web development.',
    content: `# Mastering TypeScript in 2025

## Introduction
TypeScript has become an essential tool for modern web development. In this article, we'll explore advanced patterns and best practices for 2025.

## Advanced TypeScript Features
- Utility Types
- Type Guards
- Decorators
- Advanced Generics

## Best Practices
1. Strict Mode
2. Proper Type Definitions
3. Code Organization
4. Performance Optimization

## Conclusion
TypeScript continues to evolve, and staying up-to-date with the latest features and best practices is crucial for every developer.`,
    category: 'web-development',
    tags: ['typescript', 'javascript', 'programming'],
    featuredImage: '/images/blog/typescript.jpg',
    slug: 'mastering-typescript-2025',
    isPublished: true,
    author: {
      id: generateId(),
      name: 'Mike Peterson',
      avatar: '/images/avatars/avatar3.jpg'
    },
    stats: {
      views: 1200,
      likes: 150,
      comments: 32,
      bookmarks: 78
    },
    readingTime: 10,
    createdAt: '2025-07-05T09:15:00Z',
    updatedAt: '2025-07-05T09:15:00Z',
    publishedAt: '2025-07-05T09:15:00Z',
    content: `# Mastering TypeScript in 2025

## Introduction
TypeScript continues to dominate the web development landscape. Let's dive into advanced patterns and best practices.

## Advanced TypeScript Features
- Conditional types
- Mapped types
- Template literal types
- Utility types

## Best Practices
1. Strict mode
2. Type inference
3. Generics
4. Type guards

## Common Pitfalls
- Overusing 'any' type
- Ignoring compiler warnings
- Complex type definitions

## Conclusion
TypeScript is a powerful tool that can significantly improve your development experience and code quality.`,
  },
  {
    _id: '4',
    title: 'The Complete Guide to CSS Grid',
    excerpt: 'Master the CSS Grid layout system with this comprehensive guide.',
    content: `# The Complete Guide to CSS Grid

## Introduction
CSS Grid is a powerful layout system available in CSS. It's a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system.

## Basic Concepts
- Grid Container
- Grid Items
- Grid Lines
- Grid Tracks
- Grid Cells
- Grid Areas

## Common Use Cases
1. Page Layouts
2. Image Galleries
3. Forms
4. Card Layouts

## Conclusion
CSS Grid is a powerful tool that every web developer should have in their toolkit.`,
    category: 'web-development',
    tags: ['css', 'layout', 'design'],
    featuredImage: '/images/blog/css-grid.jpg',
    slug: 'css-grid-layout-guide',
    isPublished: true,
    author: {
      id: generateId(),
      name: 'Emma Wilson',
      avatar: '/images/avatars/avatar4.jpg'
    },
    stats: {
      views: 2030,
      likes: 203,
      comments: 37,
      bookmarks: 95
    },
    readingTime: 7,
    createdAt: '2025-06-28T11:20:00Z',
    updatedAt: '2025-06-28T11:20:00Z',
    publishedAt: '2025-06-28T11:20:00Z',
  },
  {
    _id: '5',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn how to build robust and scalable APIs using Node.js and Express.',
    content: `# Building Scalable APIs with Node.js

## Introduction
Building scalable APIs is crucial for modern web applications. In this guide, we'll explore best practices for creating robust APIs with Node.js and Express.

## Key Concepts
- RESTful Principles
- Middleware
- Error Handling
- Authentication & Authorization
- Rate Limiting
- Caching

## Best Practices
1. Use async/await
2. Implement proper error handling
3. Validate request data
4. Use environment variables
5. Implement proper logging

## Conclusion
Building scalable APIs requires careful planning and attention to detail. By following these best practices, you can create APIs that are maintainable, secure, and performant.`,
    category: 'backend',
    tags: ['nodejs', 'api', 'express', 'backend'],
    featuredImage: '/images/blog/nodejs-api.jpg',
    slug: 'building-scalable-apis-nodejs',
    isPublished: true,
    author: {
      id: generateId(),
      name: 'David Kim',
      avatar: '/images/avatars/avatar5.jpg'
    },
    stats: {
      views: 1750,
      likes: 198,
      comments: 42,
      bookmarks: 87
    },
    readingTime: 12,
    createdAt: '2025-06-25T16:45:00Z',
    updatedAt: '2025-06-25T16:45:00Z',
    publishedAt: '2025-06-25T16:45:00Z',

  },
];

export const blogCategories = [
  'All',
  'Web Development',
  'Artificial Intelligence',
  'TypeScript',
  'CSS',
  'Backend',
  'Frontend',
  'Mobile',
  'DevOps',
  'Cloud',
  'Security',
];

export const popularTags = [
  { name: 'web', count: 45 },
  { name: 'tutorial', count: 32 },
  { name: 'beginners', count: 28 },
  { name: 'ai', count: 23 },
  { name: 'typescript', count: 19 },
  { name: 'react', count: 18 },
  { name: 'nodejs', count: 16 },
  { name: 'css', count: 15 },
  { name: 'security', count: 12 },
  { name: 'cloud', count: 10 },
];
