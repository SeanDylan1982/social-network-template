const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
  getReplies,
  createReply
} = require('../controllers/commentController');

// Public routes
router.get('/post/:postId', getComments);
router.get('/:commentId', getComment);
router.get('/:commentId/replies', getReplies);

// Protected routes (require authentication)
router.use(protect);

router.post('/', createComment);
router.post('/:commentId/reply', createReply);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);
router.post('/:commentId/like', likeComment);
router.delete('/:commentId/like', unlikeComment);

module.exports = router;
