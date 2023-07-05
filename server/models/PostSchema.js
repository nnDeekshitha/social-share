const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  owner: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // field: "id",
    required: true,
  },
  date_created: {
    type: Date,
    default: new Date(),
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
});

const Post = (module.exports = mongoose.model("Post", PostSchema));
