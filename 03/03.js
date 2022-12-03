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
  const mappedItems = items.map((x) => {
    let middle = x.length / 2;
    return {
      left: x.slice(0, middle),
      right: x.slice(middle, x.length),
    };
  });
  let prioritySum = 0;
  mappedItems.forEach((item) => {
    for (let i = 0; i < item.left.length; i++) {
      let curr = item.left[i];
      if (item.right.includes(curr)) {
        prioritySum += getPriority(curr);
        break;
      }
    }
  });
  return prioritySum;
};

part2 = (items) => {
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
