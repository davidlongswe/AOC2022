const fs = require("fs");
const args = fs
  .readFileSync("07.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x.split(" "));

const getDirectoryTree = (args) => {
  const directories = {};
  const parserPath = [];
  for (let [prompt, command, params] of args) {
    if (prompt === "$" && command === "cd") {
      params === ".." ? parserPath.pop() : parserPath.push(params);
    } else if (/^\d+$/.test(prompt)) {
      const fileSize = Number(prompt.match(/\d+/)[0]);
      const path = [];
      parserPath.forEach((dir) => {
        path.push(dir);
        const dirTotal = directories[path.join("/")] ?? 0;
        directories[path.join("/")] = dirTotal + fileSize;
      });
    }
  }
  return directories;
};

const dirTree = getDirectoryTree(args);

const part1 = (directories) => {
  return Object.values(directories)
    .filter((dirSize) => dirSize <= 1e5)
    .reduce((a, b) => a + b, 0);
};

const part2 = (directories) => {
  const ROOT_DIR_SIZE = Object.values(directories).sort((a, b) => b - a)[0];
  return Object.values(directories)
    .filter((dirSize) => 7e7 - ROOT_DIR_SIZE + dirSize >= 3e7)
    .sort((a, b) => a - b)[0];
};

console.log(part1(dirTree));
console.log(part2(dirTree));
