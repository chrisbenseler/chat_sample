const Repository = require("./repository");

const dbHandler = require("../../db/mongo/testhandler");
const RoomModel = require("../../db/mongo/Room");

let repository = null;

describe("Room repository", () => {
  beforeAll(async () => {
    await dbHandler.connect();
    repository = Repository({ roomDAO: RoomModel });
  });
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  test("Should have a repository", async () => {
    expect(repository).toBeDefined();
  });

  test("Should have empty list of rooms", async () => {
    const rooms = await repository.rooms();
    expect(rooms.length).toBe(0);
  });

  test("Should create a o room", async () => {
    const room = await repository.create({ userId: "abc" });
    expect(room).toBeDefined();
    expect(room.owner).toBe("abc");
  });

  describe("Get a room", () => {
    test("Should  return null", async () => {
      const room = await repository.get({ id: 20 });
      expect(room).toBe(null);
    });

    test("Should have a room", async () => {
      const room = await repository.create({ userId: "abc" });
      const savedRoom = await repository.get({ id: room.id });
      expect(savedRoom).toBeDefined();
      expect(savedRoom.owner).toBe("abc");
    }); 
  });
});

/*








*/
