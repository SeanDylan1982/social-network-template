import Message from '../models/Message.js';
import User from '../models/User.js';
import { Types } from 'mongoose';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res, next) => {
  try {
    const { recipientId, content, mediaType, mediaUrl } = req.body;
    const senderId = req.user._id;

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      res.status(404);
      throw new Error('Recipient not found');
    }

    // Check if user is trying to message themselves
    if (recipientId === senderId.toString()) {
      res.status(400);
      throw new Error('You cannot send a message to yourself');
    }

    // Check if users are friends (optional, remove if you want to allow messaging anyone)
    const sender = await User.findById(senderId);
    if (!sender.friends.includes(recipientId)) {
      res.status(403);
      throw new Error('You can only message your friends');
    }

    // Create and save the message
    const message = await Message.create({
      sender: senderId,
      recipient: recipientId,
      content,
      mediaType,
      mediaUrl,
      isRead: false
    });

    // Populate sender details
    const populatedMessage = await Message.findById(message._id).populate(
      'sender',
      'name username profilePicture'
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

// @desc    Get messages between current user and another user
// @route   GET /api/messages/:userId
// @access  Private
export const getMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Check if the other user exists
    const otherUser = await User.findById(userId);
    if (!otherUser) {
      res.status(404);
      throw new Error('User not found');
    }

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name username profilePicture');

    // Mark messages as read
    await Message.updateMany(
      {
        sender: userId,
        recipient: currentUserId,
        isRead: false
      },
      { isRead: true }
    );

    const total = await Message.countDocuments({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    });

    res.json({
      messages: messages.reverse(), // Return in chronological order
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get list of conversations
// @route   GET /api/messages
// @access  Private
export const getConversations = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: Types.ObjectId(currentUserId) },
            { recipient: Types.ObjectId(currentUserId) }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", Types.ObjectId(currentUserId)] },
              "$recipient",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ["$recipient", Types.ObjectId(currentUserId)] },
                  { $eq: ["$isRead", false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          user: {
            _id: '$user._id',
            username: '$user.username',
            name: '$user.name',
            profilePicture: '$user.profilePicture'
          },
          lastMessage: {
            _id: '$lastMessage._id',
            content: '$lastMessage.content',
            mediaType: '$lastMessage.mediaType',
            mediaUrl: '$lastMessage.mediaUrl',
            isRead: '$lastMessage.isRead',
            createdAt: '$lastMessage.createdAt',
            sender: '$lastMessage.sender'
          },
          unreadCount: 1
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get unread message count
// @route   GET /api/messages/unread/count
// @access  Private
export const getUnreadCount = async (req, res, next) => {
  try {
    const count = await Message.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    res.json({ unreadCount: count });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark messages as read
// @route   PUT /api/messages/:userId/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    await Message.updateMany(
      {
        sender: userId,
        recipient: currentUserId,
        isRead: false
      },
      { isRead: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:messageId
// @access  Private
export const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const currentUserId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }

    // Check if the current user is the sender or recipient
    if (
      message.sender.toString() !== currentUserId.toString() &&
      message.recipient.toString() !== currentUserId.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized to delete this message');
    }

    await message.remove();

    res.json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a conversation
// @route   DELETE /api/messages/conversation/:userId
// @access  Private
export const deleteConversation = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    // Delete all messages between the two users
    await Message.deleteMany({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    });

    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    next(error);
  }
};
