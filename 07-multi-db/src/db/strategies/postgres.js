import { ICrud } from "./interfaces/crud.interface.js";

export class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("The item was created in Postgres");
  }
}
