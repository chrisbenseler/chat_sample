module.exports = ({ roomsRepository }) => {
  return {
    create: async ({ userId }) => {
      await roomsRepository.create({ userId });
    },
    join: async ({ id, partnerId }) => {
      const room = await roomsRepository.get({ id });

      if (!room) {
        throw new Error("No room found");
      }
      return roomsRepository.join({ id, partnerId });
    },
  };
};
