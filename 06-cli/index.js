import { Command } from "commander";
import { Database } from "./database.js";
import { Hero } from "./hero.js";

async function main(params) {
  const DATABASE = new Database();
  const program = new Command();

  program
    .version("v1")
    .option("-n, --name [value", "Hero name")
    .option("-p, --power [value", "Power of hero")
    .option("-id --id [value]", "ID of hero to do any functionality")
    .option("-c, --create", "Create a hero in database")
    .option("-r, --read", "Read a hero list from database")
    .option("-u --update", "Update a hero in database")
    .option("-d --delete", "Delete a hero from database");

  program.parse(process.argv);

  const options = program.opts();

  const hero = new Hero(options);

  try {
    if (options.create) {
      delete hero.id;

      const result = await DATABASE.create(hero);

      if (!result) {
        throw Error("Couldn't create a new hero");
      }

      console.log("Created a new successfuly created");
    }
    if (options.read) {
      const result = await DATABASE.list(hero.id);

      console.table(result);
    }
    if (options.update) {
      const result = await DATABASE.update(hero.id, hero);

      console.log("statusCode: " + 200);
    }
    if (options.delete) {
      const result = await DATABASE.remove(hero.id);
      if (!result) {
        throw Error("Couldn't delete a user");
      }

      console.log("User was deleted successfuly");
    }
  } catch (error) {
    console.error(error);
  }
}

main();
