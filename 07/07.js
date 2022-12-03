const fs = require("fs");
const input = fs
  .readFileSync("07.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);
