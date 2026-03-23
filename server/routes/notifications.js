const router = require("express").Router();
const Notification = require("../models/Notification");

// CREATE
router.post("/", async (req, res) => {
  const n = new Notification(req.body);
  await n.save();
  res.json(n);
});

// GET
router.get("/:userId", async (req, res) => {
  const data = await Notification.find({ userId: req.params.userId });
  res.json(data);
});

module.exports = router;