# API Documentation

This document provides comprehensive documentation for the Social Network Template API, including endpoints, request/response formats, and authentication requirements.

## Quick Start

1. **Get an API Key**
   - Register at `/api/auth/register`
   - Or use OAuth providers (Google, Facebook, GitHub)

2. **Make Authenticated Requests**
   ```http
   GET /api/users/me
   Authorization: Bearer your-jwt-token-here
   ```

3. **Explore Available Endpoints**
   - [Authentication](#authentication-endpoints)
   - [Users](#users-endpoints)
   - [Posts](#posts-endpoints)
   - [Comments](#comments-endpoints)
   - [Messages](#messages-endpoints)
   - [Notifications](#notifications-endpoints)
   - [Media](#media-endpoints)

## Table of Contents

- [Authentication](#authentication)
- [Base URL](#base-url)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Authentication](#authentication-endpoints)
  - [Users](#users-endpoints)
  - [Posts](#posts-endpoints)
  - [Comments](#comments-endpoints)
  - [Messages](#messages-endpoints)
  - [Notifications](#notifications-endpoints)
  - [Media](#media-endpoints)

## Authentication

All API endpoints (except public routes) require authentication. The API uses JWT (JSON Web Tokens) for stateless authentication.

### Authentication Methods

1. **JWT Token** (Recommended)
   - Obtained via `/api/auth/login`
   - Sent in `Authorization: Bearer <token>` header
   - Tokens expire after 7 days (configurable)

2. **Session Cookie** (Web only)
   - Set automatically after successful login
   - Requires `credentials: 'include'` in fetch requests
   - More secure for web applications

3. **API Key** (For server-to-server)
   - Request via `/api/auth/api-key`
   - Sent in `X-API-Key` header
   - Rotate keys regularly

### Obtaining a Token

#### Login with Email/Password

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Login with OAuth

```http
GET /api/auth/[provider]
# Redirects to provider's login page
# Callback URL: /api/auth/[provider]/callback
```

#### Refresh Token

```http
POST /api/auth/refresh-token
```

### Token Refresh Flow

1. Client detects token is about to expire
2. Sends refresh token to `/api/auth/refresh-token`
3. Receives new access token
4. Updates client-side token storage

## Base URL

All API endpoints are prefixed with `/api`.

```
https://api.yourdomain.com/api
```

For local development:

```
http://localhost:3000/api
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field1": "Error detail 1",
      "field2": "Error detail 2"
    },
    "timestamp": "2023-11-01T12:00:00Z",
    "requestId": "req_1234567890"
  }
}
```

### Common Error Codes

| Status Code | Error Code | Description | Retry |
|-------------|------------|-------------|-------|
| 400 | BAD_REQUEST | Invalid request format or parameters | No |
| 401 | UNAUTHORIZED | Authentication required or invalid token | Maybe* |
| 403 | FORBIDDEN | Insufficient permissions | No |
| 404 | NOT_FOUND | Resource not found | No |
| 409 | CONFLICT | Resource already exists | No |
| 422 | VALIDATION_ERROR | Request validation failed | No |
| 429 | RATE_LIMIT_EXCEEDED | Rate limit exceeded | Yes (with backoff) |
| 500 | INTERNAL_SERVER_ERROR | Server error | Yes (with backoff) |
| 502 | BAD_GATEWAY | Upstream service error | Yes |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable | Yes |
| 504 | GATEWAY_TIMEOUT | Upstream service timeout | Yes |

*Retry with fresh token if expired

### Handling Errors in Your Application

1. **Client-Side Handling**
   ```javascript
   async function fetchWithErrorHandling(url, options = {}) {
     const response = await fetch(url, {
       ...options,
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${getToken()}`,
         ...options.headers,
       },
     });
   
     const data = await response.json();
   
     if (!response.ok) {
       const error = new Error(data.error?.message || 'An error occurred');
       error.code = data.error?.code;
       error.details = data.error?.details;
       error.status = response.status;
       throw error;
     }
   
     return data;
   }
   ```

2. **Rate Limiting**
   - Check `X-RateLimit-*` headers
   - Implement exponential backoff
   - Cache responses when possible

3. **Retry Logic**
   - Only retry on 5xx errors or rate limits
   - Use exponential backoff
   - Set a maximum retry count

## Rate Limiting & Quotas

### Rate Limits

| Endpoint Type | Limit | Window | Scope |
|---------------|-------|--------|-------|
| Public API | 100 requests | 15 minutes | IP |
| Authenticated API | 1,000 requests | 15 minutes | User |
| File Uploads | 10 requests | 1 minute | User |
| Authentication | 5 attempts | 1 hour | IP |
| Password Reset | 3 attempts | 24 hours | Email |

### Rate Limit Headers

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 850
X-RateLimit-Reset: 1620000000
X-RateLimit-Policy: 1000;w=900,10000;w=86400
Retry-After: 60
```

### Handling Rate Limits

1. **Check Headers**
   - `X-RateLimit-Remaining`: Requests left in window
   - `X-RateLimit-Reset`: Unix timestamp when limit resets
   - `Retry-After`: Seconds to wait before retrying

2. **Best Practices**
   - Cache responses when possible
   - Implement exponential backoff
   - Use webhooks for real-time updates
   - Request higher limits if needed

3. **Monitoring**
   - Track usage with `X-RateLimit-*` headers
   - Set up alerts at 80% of limit
   - Monitor error rates and retries

### Increasing Limits

For higher rate limits:
1. Use OAuth authentication
2. Implement request batching
3. Contact support with your use case

## Pagination & Filtering

### Pagination

All list endpoints support pagination using `limit` and `offset` query parameters:

```http
GET /api/posts?limit=20&offset=40
```

**Response Headers**
```
X-Pagination-Total: 100
X-Pagination-Page: 3
X-Pagination-Limit: 20
Link: </api/posts?limit=20&offset=60>; rel="next", </api/posts?limit=20&offset=0>; rel="first"
```

### Filtering

Filter resources using query parameters:

```http
GET /api/posts?status=published&author=user123&tags=tech,programming
```

### Sorting

Sort results using the `sort` parameter:

```http
GET /api/users?sort=-createdAt,name
```
- Prefix with `-` for descending order
- Multiple fields separated by commas

### Field Selection

Select specific fields to return:

```http
GET /api/users/me?fields=id,name,email,avatar
```

## Webhooks

### Available Events

- `user.created`
- `user.updated`
- `post.created`
- `comment.created`
- `message.received`

### Setup Webhook

```http
POST /api/webhooks
{
  "url": "https://your-callback-url.com/events",
  "events": ["user.created", "post.created"],
  "secret": "your-signing-secret"
}
```

### Webhook Payload

```json
{
  "event": "user.created",
  "data": {
    "id": "user123",
    "email": "user@example.com"
  },
  "timestamp": "2023-11-01T12:00:00Z"
}
```

### Security

- Verify webhook signatures
- Validate payload structure
- Implement idempotency keys
- Set up retry logic

## Endpoints

### Authentication Endpoints

#### Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user123",
      "name": "John Doe",
      "email": "user@example.com",
      "avatar": "/avatars/user123.jpg"
    }
  }
}
```

### Users Endpoints

#### Get Current User Profile

```http
GET /api/users/me
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "email": "user@example.com",
    "username": "johndoe",
    "avatar": "/avatars/user123.jpg",
    "bio": "Software developer and tech enthusiast",
    "location": "San Francisco, CA",
    "website": "https://johndoe.dev",
    "joinedAt": "2023-01-15T10:30:00Z",
    "stats": {
      "posts": 42,
      "followers": 1234,
      "following": 567
    }
  }
}
```

### Posts Endpoints

#### Create a Post

```http
POST /api/posts
```

**Request Body:**

```json
{
  "content": "Check out this amazing photo!",
  "media": [
    {
      "type": "image",
      "url": "/uploads/posts/photo123.jpg"
    }
  ],
  "visibility": "public",
  "tags": ["photo", "nature"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "post123",
    "content": "Check out this amazing photo!",
    "author": {
      "id": "user123",
      "name": "John Doe",
      "username": "johndoe",
      "avatar": "/avatars/user123.jpg"
    },
    "media": [
      {
        "type": "image",
        "url": "/uploads/posts/photo123.jpg",
        "width": 1200,
        "height": 800
      }
    ],
    "likes": 0,
    "comments": 0,
    "shares": 0,
    "isLiked": false,
    "isShared": false,
    "isBookmarked": false,
    "visibility": "public",
    "tags": ["photo", "nature"],
    "createdAt": "2023-06-15T14:30:00Z",
    "updatedAt": "2023-06-15T14:30:00Z"
  }
}
```

### Comments Endpoints

#### Add Comment to Post

```http
POST /api/posts/:postId/comments
```

**Request Body:**

```json
{
  "content": "This is an amazing post!"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "comment123",
    "content": "This is an amazing post!",
    "author": {
      "id": "user456",
      "name": "Jane Smith",
      "username": "janesmith",
      "avatar": "/avatars/user456.jpg"
    },
    "postId": "post123",
    "likes": 0,
    "isLiked": false,
    "createdAt": "2023-06-15T15:45:00Z"
  }
}
```

### Messages Endpoints

#### Send a Direct Message

```http
POST /api/messages
```

**Request Body:**

```json
{
  "recipientId": "user789",
  "content": "Hey, how are you doing?",
  "media": []
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "msg123",
    "conversationId": "conv123",
    "sender": {
      "id": "user123",
      "name": "John Doe",
      "username": "johndoe",
      "avatar": "/avatars/user123.jpg"
    },
    "recipient": {
      "id": "user789",
      "name": "Alice Johnson",
      "username": "alicej",
      "avatar": "/avatars/user789.jpg"
    },
    "content": "Hey, how are you doing?",
    "media": [],
    "isRead": false,
    "createdAt": "2023-06-15T16:30:00Z"
  }
}
```

### Notifications Endpoints

#### Get User Notifications

```http
GET /api/notifications
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 20 | Number of notifications to return |
| offset | number | No | 0 | Number of notifications to skip |
| unreadOnly | boolean | No | false | Return only unread notifications |

**Response:**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif123",
        "type": "LIKE_POST",
        "fromUser": {
          "id": "user456",
          "name": "Jane Smith",
          "username": "janesmith",
          "avatar": "/avatars/user456.jpg"
        },
        "targetId": "post123",
        "targetType": "POST",
        "isRead": false,
        "createdAt": "2023-06-15T17:15:00Z"
      },
      {
        "id": "notif124",
        "type": "NEW_FOLLOWER",
        "fromUser": {
          "id": "user789",
          "name": "Alice Johnson",
          "username": "alicej",
          "avatar": "/avatars/user789.jpg"
        },
        "targetId": "user123",
        "targetType": "USER",
        "isRead": true,
        "createdAt": "2023-06-14T09:30:00Z"
      }
    ],
    "total": 2,
    "unreadCount": 1
  }
}
```

### Media Endpoints

#### Upload Media

```http
POST /api/media/upload
Content-Type: multipart/form-data
```

**Form Data:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | File | Yes | The media file to upload |
| type | string | No | Media type (image, video, document) |
| folder | string | No | Target folder for organization |

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "media123",
    "url": "/uploads/posts/photo123.jpg",
    "type": "image",
    "mimeType": "image/jpeg",
    "size": 123456,
    "width": 1200,
    "height": 800,
    "duration": null,
    "createdAt": "2023-06-15T18:00:00Z"
  }
}
```

## WebSocket Events

The following WebSocket events are available for real-time updates:

### Connection

- **Event:** `connection`
- **Description:** Fires when a client connects to the WebSocket server
- **Data:** `{ userId: string }`

### Notifications

- **Event:** `notification`
- **Description:** Fires when a new notification is created
- **Data:** 
  ```typescript
  {
    id: string;
    type: string;
    fromUser: User;
    targetId: string;
    targetType: string;
    isRead: boolean;
    createdAt: string;
  }
  ```

### Messages

- **Event:** `message`
- **Description:** Fires when a new message is received
- **Data:** 
  ```typescript
  {
    id: string;
    conversationId: string;
    sender: User;
    recipient: User;
    content: string;
    media: Media[];
    isRead: boolean;
    createdAt: string;
  }
  ```

### Typing Indicator

- **Event:** `typing`
- **Description:** Fires when a user is typing a message
- **Data:** 
  ```typescript
  {
    conversationId: string;
    userId: string;
    isTyping: boolean;
  }
  ```

## Webhook Events

The following webhook events are available for integration with external services:

### User Events

- `user.created` - A new user registered
- `user.updated` - User profile was updated
- `user.deleted` - User account was deleted

### Content Events

- `post.created` - A new post was created
- `post.updated` - A post was updated
- `post.deleted` - A post was deleted
- `comment.created` - A new comment was added
- `comment.deleted` - A comment was deleted

### Social Events

- `follow` - A user followed another user
- `unfollow` - A user unfollowed another user
- `like` - A user liked a post or comment
- `unlike` - A user unliked a post or comment

### Message Events

- `message.sent` - A direct message was sent
- `message.read` - A message was marked as read

## Pagination

List endpoints support pagination using the following query parameters:

- `limit`: Number of items per page (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

### Pagination Headers

```http
X-Pagination-Total: 100
X-Pagination-Page: 1
X-Pagination-Limit: 20
X-Pagination-Pages: 5
```

## Filtering and Sorting

Many list endpoints support filtering and sorting using query parameters.

### Filtering

```
GET /api/posts?status=published&author=user123
```

### Sorting

```
GET /api/posts?sort=-createdAt,title
```

- Prefix field with `-` for descending order
- Multiple fields can be specified, separated by commas

## Field Selection

Use the `fields` parameter to limit the fields returned in the response.

```
GET /api/users/me?fields=id,name,email,avatar
```

## Related Resources

- [API Client Libraries](#)
- [API Changelog](CHANGELOG.md)
- [Rate Limiting Policy](#rate-limiting)
- [API Status Page](https://status.yourdomain.com)

## Support

For API support, please contact [api-support@yourdomain.com](mailto:api-support@yourdomain.com) or visit our [developer portal](https://developers.yourdomain.com).
