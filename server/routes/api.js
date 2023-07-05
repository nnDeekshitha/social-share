const express = require("express");
const Follow = require("../models/FollowSchema");
const Post = require("../models/PostSchema");

const router = express.Router();

// GET /follow/:userId/count
// Get the total follower, following, and post count for a user
router.get("/:userId/count", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count the number of follower records for the user
    const followerCount = await Follow.countDocuments({ following: userId });

    // Count the number of following records for the user
    const followingCount = await Follow.countDocuments({ follower: userId });

    // Count the number of posts made by the user
    const postCount = await Post.countDocuments({ owner: userId });

    res.json({ followerCount, followingCount, postCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
