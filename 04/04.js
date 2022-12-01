const { readFileSync } = require("fs");
const input = fs
  .readFileSync("04.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);
