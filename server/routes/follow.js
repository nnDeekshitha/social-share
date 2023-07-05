const express = require("express");
const Follow = require("../models/FollowSchema");
const User = require("../models/UserSchema");

const router = express.Router();

// @Path        : /follow/new
// @method      : POST
// @description : Get all the users a specific user is following
// @Access      : PUBLIC
router.post("/new", async (req, res) => {
  try {
    const { follower, following } = req.body;

    // Verify if the IDs exist or not (You can use your own User model for this)
    const followerExists = await User.exists({ _id: follower });
    const followingExists = await User.exists({ _id: following });

    if (!followerExists || !followingExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the following user is already following the follower user
    const existingFollow = await Follow.findOne({
      follower: following,
      following: follower,
    });
    if (existingFollow) {
      // Find and update the follow record
      Follow.findOneAndUpdate(
        {
          follower: following,
          following: follower,
        },
        {
          isMutual: true,
        }
      );
    }

    // Create a new follow record
    const follow = new Follow({
      follower: follower,
      following: following,
      isMutual: existingFollow ? true : false, // Set isMutual to true if a follow record already exists in the opposite direction
    });

    // Save the follow record
    const savedFollow = await follow.save();

    res.status(201).json(savedFollow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", msg: error });
  }
});

// @Path        : /follow/following/:followerId
// @method      : GET
// @description : Get all the users a specific user is following
// @Access      : PUBLIC
router.get("/following/:followerId", async (req, res) => {
  try {
    const followerId = req.params.followerId;

    // Find all the follow records where the follower is the specified user
    const follows = await Follow.find({ follower: followerId }).populate(
      "following"
    );

    // Extract the user information from the follow records
    const followingUsers = follows.map((follow) => ({
      id: follow.following._id,
      username: follow.following.user_name,
      email: follow.following.email,
      isMutual: follow.isMutual,
    }));

    res.json(followingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// @Path        : /follow/follower/:followingId
// @method      : GET
// @description : Get all the users a specific user is following
// @Access      : PUBLIC
router.get("/follower/:followingId", async (req, res) => {
  try {
    const followingId = req.params.followingId;

    // Find all the follow records where the follower is the specified user
    const follower = await Follow.find({ following: followingId }).populate(
      "follower"
    );

    // Extract the user information from the follow records
    const followers = follower.map((follow) => ({
      id: follow.follower._id,
      username: follow.follower.user_name,
      email: follow.follower.email,
      isMutual: follow.isMutual,
    }));

    res.json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// @Path        : /remove/:followerId/:followingId
// @method      : DELETE
// @description : Remove a follow record based on follower and following
// @Access      : PUBLIC
router.delete("/remove/:followerId/:followingId", async (req, res) => {
  try {
    const { followerId, followingId } = req.params;

    // Find and delete the follow record
    const deletedFollow = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!deletedFollow) {
      return res.status(404).json({ error: "Follow record not found" });
    }

    res.json({ message: "Follow record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", msg: error });
  }
});

module.exports = router;
