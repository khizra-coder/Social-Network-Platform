const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createPost, getPosts, likePost, commentPost } = require("../controllers/postController");

// CRUD posts
router.get("/", auth, getPosts);
router.post("/", auth, createPost);
router.post("/like/:id", auth, likePost);
router.post("/comment/:id", auth, commentPost);

module.exports = router;