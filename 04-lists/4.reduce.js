import { obterPessoas } from "./service.js";

Array.prototype.myReduce = function (callback, initValue) {
  let finalValue = typeof initValue !== undefined ? initValue : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    finalValue = callback(finalValue, this[index], this);
  }
  return finalValue;
};

async function main() {
  try {
    const { results } = await obterPessoas(`a`);
    const height = results.map((item) => parseInt(item.height));
    console.log("Height", height);


    const myList = [
      ["Erick", "Wendel"],
      ["NodeBR", "Nerdzão"],
    ];
    const total = myList
      .myReduce((prev, next) => {
        return prev.concat(next);
      }, [])
      .join(", ");
    console.log("total", total);
    
  } catch (error) {
    console.error(`DEU RUIM`, error);
  }
}

main();
