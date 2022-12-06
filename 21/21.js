const fs = require("fs");
const input = fs
  .readFileSync("21.txt", { encoding: "utf-8" })
  .split("\r\n")
  .filter((x) => x);
