const { dir } = require("console");
const fs = require("fs");
const input = fs
  .readFileSync("07.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x);

const getDirectories = (arr) => {
  const directories = new Map();
  let visitedDirectories = [];
  let currDir = "";
  for (let i = 0; i < arr.length; i++) {
    let command = arr[i].split(" ");
    if (command[0] === "$" && command[1] === "cd") {
      if (command[2] == "..") {
        currDir = visitedDirectories.pop();
      } else {
        currDir = command[2];
        directories.set(command[2], []);
        visitedDirectories.push(command[2]);
      }
    }
    if (/^\d+$/.test(command[0])) {
      for (let visitedDirectory of visitedDirectories) {
        directories.get(visitedDirectory).push(parseInt(command[0]));
      }
    }
  }
  return directories;
};

const directories = getDirectories(input);
console.log(directories);

const part1 = () => {
  let sum = 0;
  for (let directory of directories.values()) {
    let directorySize = directory.reduce((a, b) => a + b, 0);
    let rightFileSize = directorySize <= 100000;
    if (rightFileSize) {
      sum += directorySize;
    }
  }
  console.log(sum);
};

part1();
