const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow frontend access
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // static files

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const notificationRoutes = require("./routes/notifications");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Test route
app.get("/", (req, res) => res.send("Social Network Server Running"));

// WebSocket real-time updates
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Listen for new posts
  socket.on("newPost", (post) => {
    io.emit("updatePosts", post);
  });

  // Listen for new notifications
  socket.on("newNotification", (notification) => {
    io.emit("updateNotifications", notification);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
  })
  .catch((err) => console.log(err));

module.exports = io; // export for controllers if needed