# Social Network Backend

This is the backend for a social network application built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT)
- User profiles
- Posts with text and media
- Comments and likes
- Friendships and friend requests
- Private messaging
- Real-time notifications (to be implemented)
- File uploads (to be implemented)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Create a `.env` file in the backend directory and copy the contents from `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

## Running the Application

### Development

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:5000` by default.

### Production

```bash
npm start
# or
yarn start
```

## API Documentation

API documentation is available at `/api-docs` when the server is running in development mode.

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── index.js        # Application entry point
├── .env.example        # Environment variables example
├── package.json
└── README.md
```

## Environment Variables

- `PORT` - Port to run the server on (default: 5000)
- `NODE_ENV` - Environment (development, production)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `JWT_EXPIRE` - JWT expiration time (e.g., 30d)
- `CLIENT_URL` - Frontend URL for CORS
- `MAX_FILE_UPLOAD` - Max file size for uploads (in bytes)
- `FILE_UPLOAD_PATH` - Directory to store uploaded files

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Update password
- `DELETE /api/users/delete` - Delete account

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create a post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like a post
- `DELETE /api/posts/:id/like` - Unlike a post
- `GET /api/posts/feed/me` - Get feed (posts from followed users)

### Comments

- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create a comment
- `PUT /api/comments/:commentId` - Update a comment
- `DELETE /api/comments/:commentId` - Delete a comment
- `POST /api/comments/:commentId/like` - Like a comment
- `DELETE /api/comments/:commentId/like` - Unlike a comment
- `GET /api/comments/:commentId/replies` - Get comment replies
- `POST /api/comments/:commentId/reply` - Reply to a comment

### Friendships

- `POST /api/friendships/:userId/request` - Send friend request
- `PUT /api/friendships/:requestId/respond` - Respond to friend request
- `DELETE /api/friendships/:requestId/cancel` - Cancel friend request
- `DELETE /api/friendships/:friendshipId/remove` - Remove friend
- `GET /api/friendships/requests` - Get friend requests
- `GET /api/friendships/user/:userId` - Get user's friends

### Messages

- `POST /api/messages` - Send a message
- `GET /api/messages` - Get conversations
- `GET /api/messages/:userId` - Get messages with a user
- `GET /api/messages/unread/count` - Get unread message count
- `PUT /api/messages/:userId/read` - Mark messages as read
- `DELETE /api/messages/:messageId` - Delete a message
- `DELETE /api/messages/conversation/:userId` - Delete a conversation

## Error Handling

All error responses follow the same format:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack (in development)"
}
```

## Authentication

Most routes require authentication. Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
