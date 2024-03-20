import { deepEqual, ok } from "node:assert";
import { Database } from "./database.js";

const DATABASE = new Database();

const DEFAULT_ITEM_REGISTERED = {
  id: 1,
  name: "Flash",
  power: "Speed",
};

const DEFAULT_ITEM_UPDATE = {
  name: "Rorschach",
  power: "Motherfuckeragem",
};

describe("Hero Manipulation Suite", () => {
  it("Must add a hero using files", async () => {
    const expected = DEFAULT_ITEM_REGISTERED;
    const result = await DATABASE.create(DEFAULT_ITEM_REGISTERED);

    const [actual] = await DATABASE.list(expected.id);

    deepEqual(actual, expected);
  });

  it("Must return a hero using files", async () => {
    const expected = DEFAULT_ITEM_REGISTERED;
    const [result] = await DATABASE.list(expected.id);

    deepEqual(result, expected);
  });

  it("Must update a hero by ID", async () => {
    const expected = {
      id: DEFAULT_ITEM_REGISTERED.id,
      ...DEFAULT_ITEM_UPDATE,
    };
    const [result] = await DATABASE.update(DEFAULT_ITEM_REGISTERED.id, {
      name: DEFAULT_ITEM_UPDATE.name,
      power: DEFAULT_ITEM_UPDATE.power,
    });

    deepEqual(result, expected);
  });

  it("Must remove a hero by ID", async () => {
    const expected = true;
    const result = await DATABASE.remove(DEFAULT_ITEM_REGISTERED.id);

    deepEqual(result, expected);
  });
});
