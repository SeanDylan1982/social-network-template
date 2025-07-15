const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getFeed,
  getUserPosts
} = require('../controllers/postController');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', getUserPosts);

// Protected routes (require authentication)
router.use(protect);

router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.delete('/:id/like', unlikePost);
router.get('/feed/me', getFeed);

module.exports = router;
