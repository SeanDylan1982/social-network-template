const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  isRead: {
    type: Boolean,
    default: false
  },
  mediaUrl: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    enum: ['text', 'image', 'video', 'document', null],
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for efficient querying of conversations
messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });

// Static method to get conversation between two users
messageSchema.statics.getConversation = async function(user1Id, user2Id, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  
  return this.find({
    $or: [
      { sender: user1Id, recipient: user2Id },
      { sender: user2Id, recipient: user1Id }
    ]
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .populate('sender recipient', 'username name profilePicture')
  .lean();
};

// Static method to get user conversations list
messageSchema.statics.getUserConversations = async function(userId) {
  return this.aggregate([
    {
      $match: {
        $or: [
          { sender: mongoose.Types.ObjectId(userId) },
          { recipient: mongoose.Types.ObjectId(userId) }
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
            { $eq: ["$sender", mongoose.Types.ObjectId(userId)] },
            "$recipient",
            "$sender"
          ]
        },
        lastMessage: { $first: "$$ROOT" },
        unreadCount: {
          $sum: {
            $cond: [
              { $and: [
                { $eq: ["$recipient", mongoose.Types.ObjectId(userId)] },
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
        lastMessage: 1,
        unreadCount: 1
      }
    },
    {
      $sort: { 'lastMessage.createdAt': -1 }
    }
  ]);
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
