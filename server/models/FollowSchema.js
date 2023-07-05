const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isMutual: {
    type: Boolean,
    default: false,
  },
});

// Ensure a unique combination of follower and following
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = (module.exports = mongoose.model("Follow", FollowSchema));
