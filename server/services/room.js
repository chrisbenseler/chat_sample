module.exports = ({ roomsRepository }) => {
  return {
    create: async ({ userId }) => {
      try {
        return await roomsRepository.create({ userId });
      } catch (e) {
        throw e;
      }
    },
    join: async ({ id, partnerId }) => {
      const room = await roomsRepository.get({ id });
      
      if (!room) {
        throw new Error("No room found");
      }
      try {
        return await roomsRepository.join({ id, partnerId });
      } catch(e) {
        throw e;
      }
    },
  };
};
