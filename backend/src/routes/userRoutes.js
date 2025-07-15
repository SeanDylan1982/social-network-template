const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  updatePassword,
  deleteAccount
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchUsers);

// Protected routes (require authentication)
router.use(protect);

// This route needs to come before the /:username route
router.get('/me', getMe);

// This needs to be after /me to avoid conflict
router.get('/:username', getUserProfile);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.post('/follow/:id', followUser);
router.post('/unfollow/:id', unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);
router.delete('/delete', deleteAccount);

module.exports = router;
