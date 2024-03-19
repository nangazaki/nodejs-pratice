import { obterPessoas } from "./service.js";

Array.prototype.myMap = function (callback) {
  const newMappedArray = [];
  for (let index = 0; index <= this.length - 1; index++) {
    const result = callback(this[index], index);
    newMappedArray.push(result);
  }

  return newMappedArray;
};

async function main() {
  try {
    const results = await obterPessoas(`a`);

    const names = results.results.myMap(function (pessoa, index) {
      return `[${index}]${pessoa.name}`;
    });
    console.log("names", names);
  } catch (error) {
    console.error(`DEU RUIM`, error);
  }
}
main();
