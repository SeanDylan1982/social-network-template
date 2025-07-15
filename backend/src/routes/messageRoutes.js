const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getMessages,
  getConversations,
  getUnreadCount,
  markAsRead,
  deleteMessage,
  deleteConversation
} = require('../controllers/messageController');

// Protected routes (require authentication)
router.use(protect);

// Send a message
router.post('/', sendMessage);

// Get messages between current user and another user
router.get('/:userId', getMessages);

// Get list of conversations
router.get('/', getConversations);

// Get unread message count
router.get('/unread/count', getUnreadCount);

// Mark messages as read
router.put('/:userId/read', markAsRead);

// Delete a message
router.delete('/:messageId', deleteMessage);

// Delete a conversation
router.delete('/conversation/:userId', deleteConversation);

module.exports = router;
