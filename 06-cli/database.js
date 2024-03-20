import { readFile, writeFile } from "node:fs";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

export class Database {
  constructor() {
    this.FILE_NAME = "heroes.txt";
  }

  async getFileData() {
    const file = await readFileAsync(this.FILE_NAME, "utf-8");
    return JSON.parse(file.toString());
  }

  async writeFile(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
    return true;
  }

  async create(hero) {
    const data = await this.getFileData();
    const id = !hero.id ? randomUUID() : hero.id;

    const heroWithId = {
      id,
      ...hero,
    };

    const finalData = [...data, heroWithId];

    const result = await this.writeFile(finalData);

    return result;
  }

  async list(id) {
    const data = await this.getFileData();
    const filteredData = data.filter((item) => (!!id ? item.id === id : true));

    return filteredData;
  }

  async update(id, newUserData) {
    if (!id || !newUserData) throw Error("Please, check the userID or Data");

    const data = await this.getFileData();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) throw Error("Your erro does not exists in the database!");

    data[index].name = newUserData.name;
    data[index].power = newUserData.power;

    await this.writeFile(data);

    return await this.list(id);
  }

  async remove(id) {
    if (!id) return await this.writeFile([]);

    const data = await this.getFileData();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) throw Error("Your hero does not exists in the database!");

    data.splice(index, 1);

    return await this.writeFile(data);
  }
}
