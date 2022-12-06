const fs = require("fs");
const input = fs
  .readFileSync("17.txt", { encoding: "utf-8" })
  .split("\r\n")
  .filter((x) => x);
