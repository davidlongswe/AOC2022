const fs = require("fs");
const input = fs
  .readFileSync("15.txt", { encoding: "utf-8" })
  .split("\r\n")
  .filter((x) => x);
