const fs = require("fs");
const args = fs
  .readFileSync("07.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x);

const getDirectoryTree = (args) => {
  const directories = {};
  const parserPath = [];

  for (let c of args) {
    let [prompt, command, params] = c.split(" ");
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
  //1243729
  return Object.values(directories)
    .filter((dirSize) => dirSize <= 1e5)
    .reduce((a, b) => a + b, 0);
};

const part2 = (directories) => {
  //4443914
  const AVAILABLE_SPACE = 70000000;
  const NEEDED_SPACE = 30000000;
  const ROOT_DIR_SIZE = Object.values(directories).sort((a, b) => b - a)[0];
  const UNUSED_SPACE = AVAILABLE_SPACE - ROOT_DIR_SIZE;
  return Object.values(directories)
    .filter((dirSize) => UNUSED_SPACE + dirSize >= NEEDED_SPACE)
    .sort((a, b) => a - b)[0];
};

console.log(part1(dirTree));
console.log(part2(dirTree));
