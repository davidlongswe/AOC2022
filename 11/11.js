const fs = require("fs");

const input = fs
  .readFileSync("11.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x);
