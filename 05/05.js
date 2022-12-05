const fs = require("fs");
const input = fs
  .readFileSync("05.txt", { encoding: "utf-8" })
  .split("\r\n\r\n")
  .filter((x) => x);

const stackInfo = input[0].split("\r\n").map((x) => {
  return x.replace(/[\[\]']+/g, "").split(" ");
});

const indices = stackInfo[stackInfo.length - 1]
  .filter((x) => x.match(/[0-9]+/g))
  .map(Number);

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

console.log(indices);

const createStacks = () => {
  for (let i = 0; i < indices.length; i++) {}
};
