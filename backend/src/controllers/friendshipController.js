import Friendship from '../models/Friendship.js';
import User from '../models/User.js';
import { Types } from 'mongoose';

// @desc    Send friend request
// @route   POST /api/friendships/:userId/request
// @access  Private
export const sendFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    // Check if user is trying to send request to themselves
    if (userId === currentUserId.toString()) {
      res.status(400);
      throw new Error('You cannot send a friend request to yourself');
    }

    // Check if the target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if a friendship already exists
    const existingFriendship = await Friendship.findOne({
      $or: [
        { user1: currentUserId, user2: userId },
        { user1: userId, user2: currentUserId }
      ]
    });

    if (existingFriendship) {
      if (existingFriendship.status === 'accepted') {
        res.status(400);
        throw new Error('You are already friends with this user');
      } else if (existingFriendship.status === 'pending') {
        if (existingFriendship.actionUser.toString() === currentUserId.toString()) {
          res.status(400);
          throw new Error('Friend request already sent');
        } else {
          res.status(400);
          throw new Error('This user has already sent you a friend request');
        }
      } else if (existingFriendship.status === 'blocked') {
        res.status(403);
        throw new Error('This user has blocked you');
      }
    }

    // Create new friendship request
    const friendship = await Friendship.create({
      user1: currentUserId,
      user2: userId,
      status: 'pending',
      actionUser: currentUserId
    });

    // Populate user details
    await friendship.populate('user1 user2', 'name username profilePicture');

    res.status(201).json(friendship);
  } catch (error) {
    next(error);
  }
};

// @desc    Respond to friend request (accept/reject)
// @route   PUT /api/friendships/:requestId/respond
// @access  Private
export const respondToFriendRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const currentUserId = req.user._id;

    const friendship = await Friendship.findById(requestId);

    if (!friendship) {
      res.status(404);
      throw new Error('Friend request not found');
    }

    // Check if the current user is the recipient of the request
    if (
      friendship.user2.toString() !== currentUserId.toString() &&
      friendship.user1.toString() !== currentUserId.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized to respond to this request');
    }

    // Check if the request is already accepted or rejected
    if (friendship.status !== 'pending') {
      res.status(400);
      throw new Error('This request has already been processed');
    }

    if (action === 'accept') {
      // Update friendship status to accepted
      friendship.status = 'accepted';
      friendship.actionUser = currentUserId;
      await friendship.save();

      // Add each user to the other's friends list
      await User.findByIdAndUpdate(
        friendship.user1,
        { $addToSet: { friends: friendship.user2 } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        friendship.user2,
        { $addToSet: { friends: friendship.user1 } },
        { new: true }
      );

      res.json({ message: 'Friend request accepted' });
    } else if (action === 'reject') {
      // Remove the friendship request
      await friendship.remove();
      res.json({ message: 'Friend request rejected' });
    } else {
      res.status(400);
      throw new Error('Invalid action. Use "accept" or "reject"');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel friend request
// @route   DELETE /api/friendships/:requestId/cancel
// @access  Private
export const cancelFriendRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const currentUserId = req.user._id;

    const friendship = await Friendship.findById(requestId);

    if (!friendship) {
      res.status(404);
      throw new Error('Friend request not found');
    }

    // Check if the current user is the one who sent the request
    if (friendship.actionUser.toString() !== currentUserId.toString()) {
      res.status(403);
      throw new Error('Not authorized to cancel this request');
    }

    // Check if the request is still pending
    if (friendship.status !== 'pending') {
      res.status(400);
      throw new Error('This request has already been processed');
    }

    await friendship.remove();
    res.json({ message: 'Friend request cancelled' });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove friend
// @route   DELETE /api/friendships/:friendshipId/remove
// @access  Private
export const removeFriend = async (req, res, next) => {
  try {
    const { friendshipId } = req.params;
    const currentUserId = req.user._id;

    const friendship = await Friendship.findById(friendshipId);

    if (!friendship) {
      res.status(404);
      throw new Error('Friendship not found');
    }

    // Check if the current user is part of this friendship
    if (
      friendship.user1.toString() !== currentUserId.toString() &&
      friendship.user2.toString() !== currentUserId.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized to perform this action');
    }

    // Check if they are actually friends
    if (friendship.status !== 'accepted') {
      res.status(400);
      throw new Error('You are not friends with this user');
    }

    // Remove from each other's friends list
    await User.findByIdAndUpdate(
      friendship.user1,
      { $pull: { friends: friendship.user2 } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      friendship.user2,
      { $pull: { friends: friendship.user1 } },
      { new: true }
    );

    // Delete the friendship
    await friendship.remove();

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get friend requests
// @route   GET /api/friendships/requests
// @access  Private
export const getFriendRequests = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    const requests = await Friendship.find({
      $or: [
        { user1: currentUserId, status: 'pending' },
        { user2: currentUserId, status: 'pending' }
      ]
    })
      .populate('user1 user2', 'name username profilePicture')
      .sort({ createdAt: -1 });

    // Format the response to show who sent the request
    const formattedRequests = requests.map(request => ({
      _id: request._id,
      status: request.status,
      createdAt: request.createdAt,
      isIncoming: request.user2.toString() === currentUserId.toString(),
      user: request.user1.toString() === currentUserId.toString() 
        ? request.user2 
        : request.user1
    }));

    res.json(formattedRequests);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's friends
// @route   GET /api/friendships/user/:userId
// @access  Public
export const getFriends = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Get accepted friendships where the user is either user1 or user2
    const friendships = await Friendship.find({
      $or: [
        { user1: userId, status: 'accepted' },
        { user2: userId, status: 'accepted' }
      ]
    })
      .populate('user1 user2', 'name username profilePicture')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Extract friends from friendships
    const friends = friendships.map(friendship => {
      return friendship.user1._id.toString() === userId.toString()
        ? friendship.user2
        : friendship.user1;
    });

    const total = await Friendship.countDocuments({
      $or: [
        { user1: userId, status: 'accepted' },
        { user2: userId, status: 'accepted' }
      ]
    });

    res.json({
      friends,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};
