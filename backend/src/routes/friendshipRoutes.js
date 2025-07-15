const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendFriendRequest,
  respondToFriendRequest,
  cancelFriendRequest,
  removeFriend,
  getFriendRequests,
  getFriends
} = require('../controllers/friendshipController');

// Protected routes (require authentication)
router.use(protect);

// Send friend request
router.post('/:userId/request', sendFriendRequest);

// Respond to friend request (accept/reject)
router.put('/:requestId/respond', respondToFriendRequest);

// Cancel friend request
router.delete('/:requestId/cancel', cancelFriendRequest);

// Remove friend
router.delete('/:friendshipId/remove', removeFriend);

// Get friend requests
router.get('/requests', getFriendRequests);

// Get friends list
router.get('/user/:userId', getFriends);

module.exports = router;
