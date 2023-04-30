

const Users = require("../models/User"); // import User model
const socket = require("socket.io")

// Function to send private message
const sendPrivateMessage = async (socket, io, message) => {
  try {
    // Get the sender's username from the request object (assuming it's stored in req.user.username after authentication)
    const senderUsername = socket.request.user.username;

    // Find the sender user in the database
    const senderUser = await Users.findOne({ username: senderUsername });

    // Get the receiver's username from the message object
    const receiverUsername = message.receiverUsername;

    // Find the receiver user in the database
    const receiverUser = await Users.findOne({ username: receiverUsername });

    if (!senderUser || !receiverUser) {
      // If sender or receiver user not found, emit an error event to the sender
      socket.emit("privateMessageError", {
        error: "Sender or receiver user not found",
      });
      return;
    }

    // Create a new private message object
    const privateMessage = {
      sender: senderUser._id,
      receiver: receiverUser._id,
      message: message.message,
    };

    // Emit the private message to the receiver user using their socket.id
    io.to(receiverUser.socketId).emit("privateMessage", privateMessage);

    // Emit a success event to the sender
    socket.emit("privateMessageSent", {
      message: "Private message sent successfully",
    });
  } catch (error) {
    // If any error occurs, emit an error event to the sender
    socket.emit("privateMessageError", { error: error.message });
  }
};

// q: a is th socketConnennciton function written correctly? 
// q: b how do I get the socket.io to work with the server.js file?
// answer: I need to export the socketConnection function and import it into the server.js file


const socketConnection = function (connection, request) {
    connection.socket.on("message", (message) => {
        console.log(message);
        // change the console log to some string
        
    });
}




// // Socket.io connection event
// const socketConnection = (socket, io) => {
// //   console.log("Socket connected:", socket.id);
//   socket.on("connection", (socket)=> {
//     console.log("Socket is connected")
//   })

//   // Event to listen for private messages from a logged-in user
//   socket.on("privateMessage", (message) => {
//     // Call the sendPrivateMessage function to handle the private message
//     sendPrivateMessage(socket, io, message);
//   });

//   // Event to listen for disconnect event
//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// };

module.exports = socketConnection;
