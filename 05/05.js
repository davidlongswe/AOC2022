const fs = require("fs");
const input = fs
  .readFileSync("05.txt", { encoding: "utf-8" })
  .split("\r\n\r\n")
  .filter((x) => x);

const stackInfo = input[0].split("\r\n").map((x) => {
  return x.replace(/[\[\]']+/g, "").match(/(\s{4}|\[(\S)\])/g);
});

// const indices = stackInfo[stackInfo.length - 1]
//   .filter((x) => x.match(/[0-9]+/g))
//   .map(Number);

const instructions = input[1].split("\r\n").map((x) => {
  const [amount, originStack, destinationStack] = x
    .split(" ")
    .filter((x) => x.match(/[0-9]+/g));
  return {
    amount,
    originStack,
    destinationStack,
  };
});

//console.log(stackInfo, indices, instructions);

const createStacks = (stackInfo, indices) => {
  let stacks = [];
  for (let i = 0; i < indices.length - 1; i++) {
    stacks.push([]);
  }
  for (let j = 0; j < stackInfo.length - 1; j++) {
    for (let k = 0; k < stackInfo[j].length; k++) {
      if (stackInfo[j][k] !== "") {
        stacks[k].push(stackInfo[j][k]);
      }
    }
  }
  console.log(stacks);
};

//createStacks(stackInfo, indices);

console.log(stackInfo);
