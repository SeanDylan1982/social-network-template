# Testing Guide

This document provides comprehensive guidelines for testing the Social Network Template application. It covers unit testing, integration testing, end-to-end testing, and performance testing strategies.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Testing Tools](#testing-tools)
- [Test Directory Structure](#test-directory-structure)
- [Writing Tests](#writing-tests)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [Component Tests](#component-tests)
  - [End-to-End Tests](#end-to-end-tests)
  - [API Tests](#api-tests)
  - [Performance Tests](#performance-tests)
- [Test Data Management](#test-data-management)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)
- [Testing Best Practices](#testing-best-practices)
- [Debugging Tests](#debugging-tests)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Testing Workflow](#testing-workflow)

## Testing Philosophy

Our testing approach follows these principles:

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it.
2. **Test Isolation**: Each test should be independent and not rely on the state from other tests.
3. **Fast Feedback**: Tests should run quickly to enable frequent feedback.
4. **Readability**: Tests should be easy to understand and maintain.
5. **Reliability**: Tests should be deterministic and not flaky.
6. **Good Coverage**: Aim for high test coverage, especially for critical paths.

## Testing Tools

| Tool | Purpose |
|------|---------|
| [Jest](https://jestjs.io/) | Test runner and assertion library |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | React component testing |
| [MSW (Mock Service Worker)](https://mswjs.io/) | API mocking for tests |
| [Cypress](https://www.cypress.io/) | End-to-end testing |
| [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/) | Better selectors for Cypress |
| [Jest DOM](https://testing-library.com/docs/ecosystem-jest-dom/) | Custom Jest matchers for DOM testing |
| [Faker](https://fakerjs.dev/) | Generate fake data for tests |
| [Supertest](https://github.com/visionmedia/supertest) | API endpoint testing |
| [Loki](https://loki.js.org/) | Visual regression testing |
| [Storybook](https://storybook.js.org/) | Component development and visual testing |
| [Jest Axe](https://github.com/nickcolley/jest-axe) | Accessibility testing |

## Test Directory Structure

```
tests/
├── unit/                 # Unit tests
│   ├── utils/           # Utility function tests
│   ├── hooks/           # Custom hook tests
│   └── lib/             # Library function tests
├── integration/         # Integration tests
│   ├── api/             # API integration tests
│   └── components/      # Component integration tests
├── e2e/                 # End-to-end tests
│   ├── auth/            # Authentication flows
│   ├── profile/         # Profile management
│   └── social/          # Social features
├── __mocks__/           # Manual mocks
├── fixtures/            # Test fixtures
├── utils/               # Test utilities
└── setupTests.ts        # Test setup
```

## Writing Tests

### Unit Tests

Unit tests focus on testing individual functions or classes in isolation.

**Example: Testing a utility function**

```typescript
// tests/unit/utils/formatDate.test.ts
import { formatDate } from '@/utils/date';

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const date = '2023-04-01T12:00:00Z';
    const formatted = formatDate(date);
    expect(formatted).toBe('April 1, 2023');
  });

  it('handles invalid date strings', () => {
    expect(() => formatDate('invalid-date')).toThrow('Invalid date');
  });
});
```

### Integration Tests

Integration tests verify that multiple units work together correctly.

**Example: Testing a React component with hooks**

```typescript
// tests/integration/components/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';
import { UserProvider } from '@/contexts/UserContext';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users/123', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/avatars/john.jpg',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile', () => {
  it('displays user data after loading', async () => {
    render(
      <UserProvider>
        <UserProfile userId="123" />
      </UserProvider>
    );

    // Verify loading state
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });
});
```

### Component Tests

Component tests verify that React components render correctly and respond to user interactions.

**Example: Testing a button component**

```typescript
// tests/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/common/Button';

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
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### End-to-End Tests

End-to-end tests verify complete user flows in a real browser environment.

**Example: User registration flow**

```typescript
// tests/e2e/auth/register.cy.ts
describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('allows a user to register', () => {
    // Fill out the registration form
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Verify successful registration
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, Test User').should('be.visible');
  });

  it('shows validation errors', () => {
    // Submit the form without filling it out
    cy.get('button[type="submit"]').click();
    
    // Verify validation errors
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });
});
```

### API Tests

API tests verify that your API endpoints work as expected.

**Example: Testing a REST API endpoint**

```typescript
// tests/integration/api/users.test.ts
import request from 'supertest';
import app from '@/app';
import { connectDB, disconnectDB } from '@/lib/db';
import User from '@/models/User';

describe('Users API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await disconnectDB();
  });

  describe('GET /api/users', () => {
    it('returns a list of users', async () => {
      // Create test users
      await User.create([
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
      ]);

      const response = await request(app).get('/api/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name', 'User 1');
      expect(response.body[1]).toHaveProperty('name', 'User 2');
    });
  });

  describe('POST /api/users', () => {
    it('creates a new user', async () => {
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('name', 'New User');
      expect(response.body).toHaveProperty('email', 'newuser@example.com');
      
      // Verify the user was saved to the database
      const user = await User.findOne({ email: 'newuser@example.com' });
      expect(user).not.toBeNull();
      expect(user?.name).toBe('New User');
    });
  });
});
```

### Performance Tests

Performance tests verify that your application meets performance requirements.

**Example: Lighthouse performance test**

```typescript
// tests/performance/lighthouse.cy.ts
describe('Lighthouse Performance', () => {
  it('meets performance benchmarks', () => {
    const thresholds = {
      performance: 80,
      accessibility: 90,
      'best-practices': 90,
      seo: 80,
      pwa: 50,
    };

    const desktopConfig = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
    };

    cy.visit('/');
    
    // Run Lighthouse with the desktop configuration
    cy.lighthouse(thresholds, desktopConfig);
  });
});
```

## Test Data Management

### Factories

Use factory functions to generate test data consistently.

```typescript
// tests/factories/userFactory.ts
import { faker } from '@faker-js/faker';
import { User } from '@/models/User';

export const createUserData = (overrides = {}) => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
  avatar: faker.image.avatar(),
  bio: faker.lorem.sentence(),
  ...overrides,
});

export const createUser = async (overrides = {}) => {
  const userData = createUserData(overrides);
  const user = new User(userData);
  await user.setPassword(userData.password);
  return user.save();
};
```

### Fixtures

Store static test data in fixture files.

```typescript
// tests/fixtures/users.ts
export const mockUsers = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/avatars/jane.jpg',
  },
];
```

## Test Coverage

Generate and enforce test coverage reports.

### Configuring Coverage

In `jest.config.js`:

```javascript
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // ...
};
```

### Running Coverage

```bash
# Run tests with coverage
npm test -- --coverage

# Generate HTML report
npx jest --coverage --coverageReporters=html
```

## Continuous Integration

Configure your CI pipeline to run tests on every push and pull request.

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017
        env:
          MONGO_INITDB_ROOT_USERNAME: test
          MONGO_INITDB_ROOT_PASSWORD: test
          MONGO_INITDB_DATABASE: test
        options: >-
          --health-cmd "echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --runInBand
      env:
        NODE_ENV: test
        MONGODB_URI: mongodb://test:test@localhost:27017/test?authSource=admin
        JWT_SECRET: test-secret
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        file: ./coverage/lcov.info
        fail_ci_if_error: false
```

## Testing Best Practices

### General

1. **Write tests first**: Follow Test-Driven Development (TDD) when possible.
2. **Test behavior, not implementation**: Focus on what the code does, not how it does it.
3. **Keep tests simple**: Each test should test one thing.
4. **Use descriptive test names**: Test names should describe the expected behavior.
5. **Avoid testing implementation details**: Test the public API, not internal implementation.

### Unit Testing

1. **Isolate tests**: Each test should be independent.
2. **Use mocks sparingly**: Only mock what's necessary.
3. **Test edge cases**: Include tests for edge cases and error conditions.
4. **Use snapshots judiciously**: Avoid large, brittle snapshots.

### Integration Testing

1. **Test component interactions**: Verify that components work together.
2. **Mock external dependencies**: Use MSW for API calls.
3. **Test error states**: Verify error handling and error states.

### End-to-End Testing

1. **Use data attributes**: Add `data-testid` attributes for reliable element selection.
2. **Avoid testing third-party code**: Focus on your application's functionality.
3. **Use Cypress commands**: Create custom commands for common actions.
4. **Clean up after tests**: Reset state between tests.

## Debugging Tests

### Debugging with Chrome DevTools

1. Run tests in debug mode:
   ```bash
   node --inspect-brk node_modules/.bin/jest --runInBand --watch
   ```
2. Open Chrome and navigate to `chrome://inspect`
3. Click "Open dedicated DevTools for Node"
4. Set breakpoints and debug as needed

### Debugging with VS Code

Add this to your `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasename}",
        "--config",
        "jest.config.js",
        "--runInBand",
        "--watchAll=false"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

## Common Issues and Solutions

### Tests are slow

- **Problem**: Tests take too long to run.
- **Solution**: 
  - Run tests in parallel when possible
  - Use `--maxWorkers` to optimize the number of workers
  - Mock expensive operations
  - Use `jest.setTimeout()` for specific long-running tests

### Flaky Tests

- **Problem**: Tests sometimes pass and sometimes fail.
- **Solution**:
  - Make tests independent of each other
  - Use proper cleanup in `afterEach` and `afterAll`
  - Avoid testing timing-dependent behavior
  - Use `waitFor` for asynchronous operations

### Memory Leaks

- **Problem**: Tests fail due to memory leaks.
- **Solution**:
  - Clean up event listeners and intervals
  - Use `--detectOpenHandles` to find unclosed handles
  - Check for unclosed database connections

## Testing Workflow

1. **Before committing**
   - Run unit tests: `npm test`
   - Run affected tests: `npm test -- --onlyChanged`
   - Check test coverage: `npm test -- --coverage`

2. **Before pushing**
   - Run all tests: `npm run test:ci`
   - Run end-to-end tests: `npm run test:e2e`

3. **In CI/CD**
   - Run all tests in parallel
   - Generate coverage reports
   - Enforce coverage thresholds
   - Run performance tests on staging

4. **Before releasing**
   - Run all tests
   - Verify all tests pass
   - Check performance metrics
   - Review test coverage

## Additional Resources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [MSW Documentation](https://mswjs.io/docs/)

## Support

For testing-related questions or issues, please open an issue on our [GitHub repository](https://github.com/yourusername/social-network-template/issues) or contact our testing team at [testing@yourdomain.com](mailto:testing@yourdomain.com).
