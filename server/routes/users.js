const router = require("express").Router();
const User = require("../models/users");

// SEND REQUEST
router.put("/request/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user.friendRequests.includes(req.body.userId)) {
    user.friendRequests.push(req.body.userId);
    await user.save();
  }

  res.json("Request sent");
});

// ACCEPT REQUEST
router.put("/accept/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  user.friends.push(req.body.userId);
  user.friendRequests = user.friendRequests.filter(id => id !== req.body.userId);

  await user.save();
  res.json("Friend added");
});

module.exports = router;