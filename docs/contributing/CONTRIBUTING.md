# Contributing to Social Network Template

Thank you for your interest in contributing to the Social Network Template! We welcome contributions from everyone, whether you're a developer, designer, writer, or just someone who wants to help. This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
  - [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Testing](#testing)
  - [Committing Changes](#committing-changes)
  - [Pushing Changes](#pushing-changes)
  - [Creating a Pull Request](#creating-a-pull-request)
- [Coding Standards](#coding-standards)
  - [JavaScript/TypeScript](#javascripttypescript)
  - [Styling](#styling)
  - [Naming Conventions](#naming-conventions)
  - [Documentation](#documentation)
- [Issue Tracking](#issue-tracking)
  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
  - [Good First Issues](#good-first-issues)
- [Review Process](#review-process)
- [Release Process](#release-process)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [contact@example.com](mailto:contact@example.com).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v9 or later) or yarn (v1.22 or later)
- Git
- MongoDB (v6.0 or later) or Docker

### Setting Up the Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/social-network-template.git
   cd social-network-template
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/social-network-template.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn
   ```
5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Update the values in `.env.local` with your local configuration.

6. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser** to [http://localhost:3000](http://localhost:3000)

### Project Structure

```
src/
├── app/                    # Next.js app router pages and layouts
├── components/            # Reusable UI components
│   ├── common/            # Common UI elements
│   ├── layout/            # Layout components
│   └── [feature]/         # Feature-specific components
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

## Development Workflow

### Creating a Branch

1. **Sync your fork** with the upstream repository:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

### Making Changes

1. **Follow coding standards** outlined below
2. **Write tests** for new features and bug fixes
3. **Update documentation** as needed
4. **Keep commits focused** and atomic

### Testing

Run tests before committing changes:

```bash
# Run all tests
npm test

# Run specific test file
npm test path/to/test-file.test.tsx

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Committing Changes

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Examples**:
```
feat(auth): add Google OAuth login

Add support for Google OAuth authentication using NextAuth.js.

Closes #123
```

```
fix(ui): correct button alignment in header

- Fix alignment of user menu button in header
- Add missing padding to mobile navigation

Fixes #456
```

### Pushing Changes

```bash
git push origin your-branch-name
```

### Creating a Pull Request

1. Go to the [Pull Requests](https://github.com/original-owner/social-network-template/pulls) page
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template with details about your changes
5. Add screenshots or screen recordings if applicable
6. Request reviews from maintainers
7. Address any feedback from code reviews

## Coding Standards

### JavaScript/TypeScript

- Use TypeScript for all new code
- Follow the [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- Use `const` by default, `let` when necessary, and avoid `var`
- Use arrow functions for callbacks and methods
- Use template literals for string interpolation
- Use object destructuring for props and state
- Use optional chaining (`?.`) and nullish coalescing (`??`) where appropriate
- Use `interface` for public API definitions and `type` for internal types

### Styling

- Use [Emotion](https://emotion.sh/) for component styling
- Follow the [Material-UI](https://mui.com/) component patterns
- Use the theme for colors, spacing, and typography
- Use `sx` prop for one-off styles and `styled` for reusable styled components
- Keep styles close to the components they style
- Use responsive design principles

### Naming Conventions

- **Files**: `kebab-case.tsx` for components, `PascalCase.tsx` for React components
- **Components**: `PascalCase`
- **Variables and functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types and Interfaces**: `PascalCase`
- **Boolean variables**: Prefix with `is`, `has`, or `should` (e.g., `isLoading`, `hasError`)

### Documentation

- Document all props using JSDoc
- Add comments for complex logic
- Keep the README and other documentation up to date
- Use TypeScript types for better code documentation

## Issue Tracking

### Reporting Bugs

1. Check if the issue has already been reported
2. Create a new issue with a clear title and description
3. Include steps to reproduce the issue
4. Add screenshots or error messages if applicable
5. Specify your environment (browser, OS, etc.)

### Requesting Features

1. Check if the feature has already been requested
2. Explain the problem you're trying to solve
3. Describe your proposed solution
4. Include any relevant examples or mockups

### Good First Issues

Look for issues labeled `good first issue` if you're new to the project.

## Review Process

1. A maintainer will review your PR
2. You may receive feedback or be asked to make changes
3. Once approved, your PR will be merged
4. Your changes will be included in the next release

## Release Process

1. Create a release branch from `main`
2. Update the version number in `package.json`
3. Update the changelog
4. Create a pull request with the changes
5. After merging, create a new release on GitHub
6. Publish the package to npm (for library components)

## Community

- Join our [Discord server](https://discord.gg/example)
- Follow us on [Twitter](https://twitter.com/example)
- Read our [blog](https://blog.example.com)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thank you to all our contributors
- Special thanks to our sponsors
- Built with ❤️ by the community
