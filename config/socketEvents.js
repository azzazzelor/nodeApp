exports = module.exports = function (io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {
      // console.log('a user connected');
  
      // On conversation entry, join broadcast channel
      socket.on('enter chat', (chat) => {
        socket.join(chat);
        // console.log('joined ' + conversation);
      });
  
      socket.on('leave conversation', (chat) => {
        socket.leave(chat);
        // console.log('left ' + conversation);
      });
  
      socket.on('new message', (chat) => {
        io.sockets.in(chat).emit('refresh messages', chat);
      });
  
      socket.on('disconnect', () => {
        // console.log('user disconnected');
      });
    });
  };
  