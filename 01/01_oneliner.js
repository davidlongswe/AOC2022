const fs = require("fs");

const data = fs
  .readFileSync("01.txt", { encoding: "utf-8" })
  .split("\r\n\r\n")
  .map((x) =>
    x
      .split("\n")
      .map(Number)
      .reduce((a, b) => a + b)
  )
  .sort((a, b) => a - b);

const part1Result = data[data.length - 1];
const part2Result = data.slice(-3).reduce((a, b) => a + b, 0);

console.log(part1Result, part2Result);
