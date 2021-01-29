const { v4: uuidv4 } = require('uuid');
uuidv4();

const Entity = require("./entity");

module.exports = ({ roomDAO }) => {
  return {
    create: async ({ userId }) => {
      try {
        const newRoom = Entity({ owner: userId, id: uuidv4() });
        const savedRoom = await roomDAO.create(newRoom);
        return savedRoom;
      } catch (e) {
        throw e;
      }
    },

    join: async ({ id, partnerId }) => {
      try {
        const room = await roomDAO.findOne({ id });
        if (room.partners.indexOf(partnerId) > 0) {
          throw new Error("User is already in room");
        }
        room.partners.push(partnerId);
        await room.save();
        return true;
      } catch (e) {
        throw e;
      }
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

    count: async () => {
      return await roomDAO.countDocuments();
    },
  };
};
