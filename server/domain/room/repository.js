const Entity = require("./entity");


module.exports = ({ roomDAO }) => {
  return {
    create: async ({ userId }) => {
      const newRoom = Entity({ owner: userId, id: Math.random() });
      const savedRoom = await roomDAO.create(newRoom);
      return savedRoom;
    },

    join: async ({ id, partnerId }) => {
      const room = this.get({ id });
    },

    get: async ({ id }) => {

      const room = await roomDAO.findOne({ id });
      return room;
    },

    rooms: async () => {
      try {
        return await roomDAO.find();
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    roomsCount: () => {
      return rooms.length;
    },
  };
};
