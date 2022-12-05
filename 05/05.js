const fs = require("fs");
const input = fs
  .readFileSync("05.txt", { encoding: "utf-8" })
  .split("\r\n\r\n")
  .filter((x) => x);

const stacks = [
  ["R", "P", "C", "D", "B", "G"],
  ["H", "V", "G"],
  ["N", "S", "Q", "D", "J", "P", "M"],
  ["P", "S", "L", "G", "D", "C", "N", "M"],
  ["J", "B", "N", "C", "P", "F", "L", "S"],
  ["Q", "B", "D", "Z", "V", "G", "T", "S"],
  ["B", "Z", "M", "H", "F", "T", "Q"],
  ["C", "M", "D", "B", "F"],
  ["F", "C", "Q", "G"],
];

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

const moveObjects = (stacksArr, robotModel) => {
  var stacksCopy = stacksArr.map(function (arr) {
    return arr.slice();
  });
  for (let i = 0; i < instructions.length; i++) {
    let amount = instructions[i].amount;
    let from = instructions[i].originStack - 1;
    let to = instructions[i].destinationStack - 1;
    if (robotModel === 9000) {
      for (let j = 0; j < amount; j++) {
        stacksCopy[to].push(stacksCopy[from].pop());
      }
    }
    if (robotModel === 9001) {
      stacksCopy[to].push(...stacksCopy[from].splice(-amount));
    }
  }
  console.log(getTopItems(stacksCopy));
};

const getTopItems = (stacksArr) => {
  let topItems = "";
  for (let i = 0; i < stacksArr.length; i++) {
    topItems += stacksArr[i][stacksArr[i].length - 1];
  }
  return topItems;
};

//part 1
moveObjects(stacks, 9000);

//part 2
moveObjects(stacks, 9001);
