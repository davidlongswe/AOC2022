const fs = require("fs");

const input = fs
  .readFileSync("12.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x);
