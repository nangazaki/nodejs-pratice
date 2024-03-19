import { obterPessoas } from "./service.js";

Array.prototype.myFilter = function (callback) {
  const list = [];
  for (const index in this) {
    const item = this[index];
    const result = callback(item, index, this);

    if (!result) continue;
    list.push(item);
  }
  return list;
};

async function main() {
  try {
    const { results } = await obterPessoas(`a`);

    const larsFamily = results.myFilter((item, index, list) => {
      return item.name.toLowerCase().indexOf("lars") !== -1;
    });

    const names = larsFamily.map((pessoa) => pessoa.name);
    console.log(names);
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}
main();
