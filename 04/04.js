const fs = require("fs");
const input = fs
  .readFileSync("0.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);
