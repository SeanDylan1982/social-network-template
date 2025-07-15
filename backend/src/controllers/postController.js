import Post from '../models/Post.js';
import User from '../models/User.js';
import { Types } from 'mongoose';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res, next) => {
  try {
    const { content, mediaType, mediaUrl } = req.body;

    const post = await Post.create({
      user: req.user._id,
      content,
      mediaType,
      mediaUrl
    });

    // Populate user details
    const newPost = await Post.findById(post._id).populate(
      'user',
      'name username profilePicture'
    );

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name username profilePicture')
      .populate({
        path: 'comments',
        options: { limit: 2, sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          select: 'name username profilePicture'
        }
      });

    const total = await Post.countDocuments();

    res.json({
      posts,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name username profilePicture')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          select: 'name username profilePicture'
        }
      });

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res, next) => {
  try {
    const { content, mediaType, mediaUrl } = req.body;
    
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if the post belongs to the user
    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this post');
    }

    post.content = content || post.content;
    post.mediaType = mediaType || post.mediaType;
    post.mediaUrl = mediaUrl || post.mediaUrl;
    post.isEdited = true;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if the post belongs to the user
    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this post');
    }

    await post.remove();

    res.json({ message: 'Post removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if the post has already been liked
    if (post.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error('Post already liked');
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ message: 'Post liked' });
  } catch (error) {
    next(error);
  }
};

// @desc    Unlike a post
// @route   DELETE /api/posts/:id/like
// @access  Private
export const unlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if the post has been liked
    if (!post.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error('Post has not been liked');
    }

    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await post.save();

    res.json({ message: 'Post unliked' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's feed (posts from users they follow)
// @route   GET /api/posts/feed/me
// @access  Private
export const getFeed = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get the current user's following list
    const user = await User.findById(req.user._id);
    const following = user.following;

    // Add current user's ID to include their own posts
    following.push(req.user._id);

    const posts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name username profilePicture')
      .populate({
        path: 'comments',
        options: { limit: 2, sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          select: 'name username profilePicture'
        }
      });

    const total = await Post.countDocuments({ user: { $in: following } });

    res.json({
      posts,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get posts by user ID
// @route   GET /api/posts/user/:userId
// @access  Public
export const getUserPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name username profilePicture')
      .populate({
        path: 'comments',
        options: { limit: 2, sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          select: 'name username profilePicture'
        }
      });

    const total = await Post.countDocuments({ user: req.params.userId });

    res.json({
      posts,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};
