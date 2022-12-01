const { readFileSync } = require("fs");
const input = fs
  .readFileSync("06.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);
