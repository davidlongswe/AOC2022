const fs = require("fs");
const input = fs
  .readFileSync("05.txt", { encoding: "utf-8" })
  .split("\r\n\r\n")
  .filter((x) => x);

const stacks = {
  stack1: "RPCDBG",
  stack2: "HVG",
  stack3: "NSQDJPM",
  stack4: "PSLGDCNM",
  stack5: "JBNCPFLS",
  stack6: "QBDZVGTS",
  stack7: "BZMHFTQ",
  stack8: "CMDBF",
  stack9: "FCQG",
};

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

const createStacks = (stacks) => {
  for (let instruction of instructions) {
  }
};

console.log(instructions);
