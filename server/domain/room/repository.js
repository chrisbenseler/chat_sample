const Entity = require("./entity");

let rooms = [];

module.exports = () => {
  return {
    create: async ({ userId }) => {
      const newRoom = Entity({ owner: userId });
      rooms = [...rooms, newRoom];

      return newRoom;
    },

    join: async ({ partnerId }) => {},

    rooms: () => {
        return rooms;
    },

    roomsCount: () => {
        return rooms.length;
    }
  };
};
