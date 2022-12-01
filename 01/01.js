const fs = require("fs");

const data = fs
  .readFileSync("01.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => parseInt(x));

//part 1

const getSumsCalories = (data) => {
  let elfSums = [];
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    let lastIndex = i === data.length - 1 ? true : false;
    if (!isNaN(data[i])) {
      sum += data[i];
    }
    if (isNaN(data[i]) || lastIndex) {
      elfSums.push(sum);
      sum = 0;
    }
  }
  return elfSums;
};

const max = Math.max(...getSumsCalories(data));

//part 2

const sumTopThreeElves = [...getSumsCalories(data)]
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((partialSum, next) => partialSum + next, 0);

const day1 = `DAY 1: Part 1: ${max} Part 2: ${sumTopThreeElves}`;

console.log(day1);
