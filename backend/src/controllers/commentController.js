import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, parentCommentId } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      user: req.user._id,
      post: postId,
      parentComment: parentCommentId || null
    });

    // Add the comment to the post's comments array
    post.comments.push(comment._id);
    await post.save();

    // If this is a reply, add it to the parent comment's replies array
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(
        parentCommentId,
        { $push: { replies: comment._id } },
        { new: true }
      );
    }

    // Populate the user details
    const populatedComment = await Comment.findById(comment._id).populate(
      'user',
      'name username profilePicture'
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get top-level comments (not replies)
    const comments = await Comment.find({
      post: postId,
      parentComment: { $exists: false }
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name username profilePicture')
      .populate({
        path: 'replies',
        options: { limit: 2, sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          select: 'name username profilePicture'
        }
      });

    const total = await Comment.countDocuments({
      post: postId,
      parentComment: { $exists: false }
    });

    res.json({
      comments,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single comment
// @route   GET /api/comments/:commentId
// @access  Public
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
      .populate('user', 'name username profilePicture')
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          select: 'name username profilePicture'
        }
      });

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    res.json(comment);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:commentId
// @access  Private
export const updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    // Check if the comment belongs to the user
    if (comment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this comment');
    }

    comment.content = content || comment.content;
    comment.isEdited = true;

    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId
// @access  Private
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    // Check if the comment belongs to the user or if the user is an admin
    if (
      comment.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      res.status(401);
      throw new Error('Not authorized to delete this comment');
    }

    // Remove comment from the post's comments array
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id }
    });

    // If this is a reply, remove it from the parent comment's replies array
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(comment.parentComment, {
        $pull: { replies: comment._id }
      });
    }

    // Delete the comment
    await comment.remove();

    // Delete all replies to this comment
    if (comment.replies && comment.replies.length > 0) {
      await Comment.deleteMany({ _id: { $in: comment.replies } });
    }

    res.json({ message: 'Comment removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Like a comment
// @route   POST /api/comments/:commentId/like
// @access  Private
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    // Check if the comment has already been liked
    if (comment.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error('Comment already liked');
    }

    comment.likes.push(req.user._id);
    await comment.save();

    res.json({ message: 'Comment liked' });
  } catch (error) {
    next(error);
  }
};

// @desc    Unlike a comment
// @route   DELETE /api/comments/:commentId/like
// @access  Private
export const unlikeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    // Check if the comment has been liked
    if (!comment.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error('Comment has not been liked');
    }

    comment.likes = comment.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await comment.save();

    res.json({ message: 'Comment unliked' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get replies for a comment
// @route   GET /api/comments/:commentId/replies
// @access  Public
export const getReplies = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    const replies = await Comment.find({ parentComment: commentId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name username profilePicture');

    const total = await Comment.countDocuments({ parentComment: commentId });

    res.json({
      replies,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a reply to a comment
// @route   POST /api/comments/:commentId/reply
// @access  Private
export const createReply = async (req, res, next) => {
  try {
    const { content } = req.body;
    const parentComment = await Comment.findById(req.params.commentId);

    if (!parentComment) {
      res.status(404);
      throw new Error('Parent comment not found');
    }

    // Create the reply
    const reply = await Comment.create({
      content,
      user: req.user._id,
      post: parentComment.post,
      parentComment: parentComment._id
    });

    // Add the reply to the parent comment's replies array
    parentComment.replies.push(reply._id);
    await parentComment.save();

    // Populate the user details
    const populatedReply = await Comment.findById(reply._id).populate(
      'user',
      'name username profilePicture'
    );

    res.status(201).json(populatedReply);
  } catch (error) {
    next(error);
  }
};
