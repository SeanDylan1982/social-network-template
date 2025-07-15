import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res, next) => {
  const { username, email, password, name } = req.body;

  try {
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      username,
      email,
      password,
      name,
    });

    if (user) {
      const token = generateToken(user._id);
      
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        token,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findById(req.user._id)
      .select('-password -__v')
      .populate('followers following', 'name username profilePicture');
    
    if (user) {
      res.json({
        success: true,
        data: user
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
        userId: req.user._id
      });
    }
  } catch (error) {
    console.error('Error in getMe:', error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      user.profilePicture = req.body.profilePicture || user.profilePicture;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { currentPassword, newPassword } = req.body;

    if (user && (await user.comparePassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401);
      throw new Error('Current password is incorrect');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile by username
// @route   GET /api/users/:username
// @access  Public
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password -__v -email')
      .populate('followers following', 'name username profilePicture');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Public
export const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    const keyword = q ? {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } },
      ],
    } : {};

    const users = await User.find(keyword).select('name username profilePicture');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Follow a user
// @route   POST /api/users/follow/:id
// @access  Private
export const followUser = async (req, res, next) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      res.status(400);
      throw new Error('You cannot follow yourself');
    }

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      res.status(404);
      throw new Error('User not found');
    }

    if (currentUser.following.includes(userToFollow._id)) {
      res.status(400);
      throw new Error('You are already following this user');
    }

    // Add to following list
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { following: userToFollow._id } },
      { new: true }
    );

    // Add to followers list
    await User.findByIdAndUpdate(
      userToFollow._id,
      { $addToSet: { followers: req.user._id } },
      { new: true }
    );

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Unfollow a user
// @route   POST /api/users/unfollow/:id
// @access  Private
export const unfollowUser = async (req, res, next) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      res.status(404);
      throw new Error('User not found');
    }

    if (!currentUser.following.includes(userToUnfollow._id)) {
      res.status(400);
      throw new Error('You are not following this user');
    }

    // Remove from following list
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: userToUnfollow._id } },
      { new: true }
    );

    // Remove from followers list
    await User.findByIdAndUpdate(
      userToUnfollow._id,
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's followers
// @route   GET /api/users/followers/:userId
// @access  Public
export const getFollowers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('followers')
      .populate('followers', 'name username profilePicture');
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user.followers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get users that a user is following
// @route   GET /api/users/following/:userId
// @access  Public
export const getFollowing = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('following')
      .populate('following', 'name username profilePicture');
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user.following);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/delete
// @access  Private
export const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { password } = req.body;

    if (user && (await user.comparePassword(password))) {
      await user.remove();
      res.json({ message: 'Account deleted successfully' });
    } else {
      res.status(401);
      throw new Error('Password is incorrect');
    }
  } catch (error) {
    next(error);
  }
};
