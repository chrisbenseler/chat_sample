const room = require("../services/room");

module.exports = ({ roomsService, broadcastService }) => {
  return {
    newRoom: async ({ userId }) => {
      try {
        const r = await roomsService.create({ userId });
        broadcastService.newRoom({ owner: userId });
        return r;
      } catch (e) {
        throw e;
      }
    },
    joinRoom: async ({ roomId, userId }) => {
      const status = await roomsService.join({ id: roomId, partnerId: userId });
      if (status) {
        broadcastService.userJoinRoom({ roomId: roomId, partnerId: userId });
      }
    },
    newMessage: async({ roomId, userId, message }) => {
        
    }
  };
};
