const express = require("express");

//userSchema
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const router = express.Router();

// @Path        : /post/new
// @method      : POST
// @description : Add new post
// @Access      : PUBLIC
router.post("/new", (req, res) => {
  const { title, description, images, owner } = req.body;

  if (!title | !description || !images.length || !owner)
    return res.status(400).json({ msg: "Enter all credentials" });

  User.findById(owner).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: "Invalid user",
      });
    }

    function createPostId(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const newPost = new Post({
      post_id: createPostId(16),
      owner: owner,
      title: title,
      description: description,
      images: images,
    });

    newPost
      .save()
      .then((post) => {
        return res.json({
          msg: "You Just added a new post..!",
          post: {
            id: post.post_id,
            owner: owner,
            title: title,
            description: description,
            images: images,
          },
        });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
});

// @Path          : /post/all
// @description   : Gets All Posts
// @Access        : Private
router.get("/all", (req, res) => {
  Post.find()
    .populate("owner")
    .sort({ date_created: -1 })
    .then((posts) => {
      return res.json({ msg: "Retrived the posts", posts: posts });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get posts", err: err });
    });
});

// @Path          : /post/user/:id
// @description   : Gets particular User's Posts
// @Access        : Private
router.get("/user/:id", (req, res) => {
  Post.find({ owner: req.params.id })
    .populate("owner")
    .sort({ date_created: -1 })
    .then((posts) => {
      return res.json({ msg: "Retrieved All the users post", posts: posts });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get post" });
    });
});

// @Path          : /post/:id
// @description   : gets particular post
// @Access        : Public
router.get("/:id", (req, res) => {
  Post.findOne({ post_id: req.params.id })
    .populate("owner")
    .then((post) => {
      if (!post)
        return res
          .status(404)
          .json({ msg: `No post found for id: ${req.params.id}` });

      return res.json(post);
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get post details", err });
    });
});

// @Path          : /post/:id
// @description   : update particular post
// @Access        : Private
router.put("/:id", (req, res) => {
  const { title, description } = req.body;
  Post.findOne({ post_id: req.params.id })
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ msg: `No post not found for id: ${req.params.id}` });
      }

      const updates = {};
      if (title) updates.title = title;
      if (description) updates.description = description;

      Post.updateOne(
        { post_id: req.params.id },
        {
          $set: {
            ...updates,
          },
        }
      )
        .then(() => {
          return res.json({ msg: "Updated Post" });
        })
        .catch((err) => {
          return res.json({ msg: "error", error: err });
        });
    })
    .catch((err) => {
      return res.json({ msg: "Error", error: err });
    });
});

// @Path          : /post/:id
// @description   : Remove particular post
// @Access        : Private
router.delete("/:id", (req, res) => {
  Post.findOne({ post_id: req.params.id })
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ msg: `No post not found for id: ${req.params.id}` });
      }

      Post.deleteOne({ post_id: req.params.id })
        .then(() => {
          return res.json({ msg: "Deleted" });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ msg: "Delete Action failed", error: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Failed to get post details", err });
    });
});

module.exports = router;
