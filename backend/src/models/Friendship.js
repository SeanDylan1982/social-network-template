const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending',
    required: true
  },
  actionUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index to ensure unique friendships
friendshipSchema.index({ user1: 1, user2: 1 }, { unique: true });

// Virtual to check if friendship is active
friendshipSchema.virtual('isActive').get(function() {
  return this.status === 'accepted';
});

// Static method to find friendship between two users
friendshipSchema.statics.findFriendship = async function(user1Id, user2Id) {
  return this.findOne({
    $or: [
      { user1: user1Id, user2: user2Id },
      { user1: user2Id, user2: user1Id }
    ]
  });
};

// Static method to get all friends of a user
friendshipSchema.statics.findUserFriends = async function(userId) {
  const friendships = await this.find({
    $or: [
      { user1: userId, status: 'accepted' },
      { user2: userId, status: 'accepted' }
    ]
  }).populate('user1 user2', 'username name profilePicture');

  return friendships.map(friendship => {
    return friendship.user1._id.toString() === userId.toString() 
      ? friendship.user2 
      : friendship.user1;
  });
};

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
