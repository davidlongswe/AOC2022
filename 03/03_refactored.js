const fs = require("fs");

const rucksacks = fs
  .readFileSync("03.txt", { encoding: "utf-8" })
  .split("\r\n")
  .filter((x) => x);

const getPriority = (itemStr) => {
  return (
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(itemStr) + 1
  );
};

const part1 = (items) => {
  let prioritySum = 0;
  for (let item in items) {
    let left = item.slice(0, item.length / 2);
    let right = item.slice(item.length / 2, item.length);
    for (let i = 0; i < left.length; i++) {
      if (right.includes(item.left[i])) {
        prioritySum += getPriority(item.left[i]);
        break;
      }
    }
  }
  return prioritySum;
};

const part2 = (items) => {
  let prioritySum = 0;
  let groups = [];
  for (let i = 0; i < items.length; i++) {
    groups.push(items[i]);
    if (groups.length === 3) {
      let commonItem = [...groups[0]].find(
        (item) => groups[1].includes(item) && groups[2].includes(item)
      );
      prioritySum += getPriority(commonItem);
      groups = [];
    }
  }
  return prioritySum;
};

//part1
console.log(part1(rucksacks));

//part2
console.log(part2(rucksacks));
