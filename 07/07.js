const fs = require("fs");
const input = fs
  .readFileSync("07.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x);

const getDirectories = (arr) => {
  const directories = new Map();
  let visitedDirectories = [];
  let currentDirectory = "";

  for (let i = 0; i < arr.length; i++) {
    let command = arr[i].split(" ");

    if (command[0] === "$" && command[1] === "cd") {
      if (command[2] === "..") {
        visitedDirectories.pop();
        currentDirectory = visitedDirectories[visitedDirectories.length - 1];
      } else {
        currentDirectory = command[2];
        if (!directories.has(currentDirectory))
          directories.set(currentDirectory, []);
        visitedDirectories.push(currentDirectory);
      }
    } else if (/^\d+$/.test(command[0])) {
      for (let visitedDirectory of visitedDirectories) {
        directories.get(visitedDirectory).push(parseInt(command[0]));
      }
    }
  }

  return directories;
};

const dirs = getDirectories(input);
console.log(dirs);

const part1 = (directories) => {
  return [...directories.values()]
    .filter((directory) => directory.reduce((a, b) => a + b, 0) <= 100000)
    .flat()
    .reduce((a, b) => a + b, 0);
};

const part2 = () => {};

console.log(part1(dirs));
part2();
