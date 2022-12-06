const fs = require("fs");
const input = fs
  .readFileSync("18.txt", { encoding: "utf-8" })
  .split("\r\n")
  .filter((x) => x);
