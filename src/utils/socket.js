const socket = require("socket.io");
const crypto = require("crypto");

const getSecureRoom = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Handling events

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = getSecureRoom(userId, targetUserId);

      console.log(`${firstName} joined chat : ${room}`);
      socket.join(room);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const room = getSecureRoom(userId, targetUserId);
      socket.join(room);
      console.log(`${firstName} sent : ${text}`);

      io.to(room).emit("messageReceived", { firstName, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
