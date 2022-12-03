const fs = require("fs");
const input = fs
  .readFileSync("09.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);
