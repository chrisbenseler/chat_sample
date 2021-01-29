const { expect } = require("@jest/globals");
const Repository = require("./repository");

let repository = null;
beforeEach(() => {
    repository = Repository();
});

test("Should have a repository", () => {
  expect(repository).toBeDefined();
});

test("Should have empty list of rooms", () => {
    expect(repository.rooms().length).toBe(0);
});

test("Should create a o room", async () => {
    const room = await repository.create({ userId: "abc" })
    expect(room).toBeDefined();
    expect(room.owner).toBe("abc");
});
