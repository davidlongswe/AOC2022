//DISCLAIMER (NEEDED HELP TODAY)
const fs = require("fs");

const input = fs.readFileSync("14.txt", { encoding: "utf-8" });

const sandStartingCoord = [500, 0];

let cavesInput = input
  .split("\n")
  .map((row) => row.split(" -> ").map((coord) => coord.split(",").map(Number)));

let xMax = Math.max(...cavesInput.flat().map((coords) => coords[0])) * 2;
let yMax = Math.max(...cavesInput.flat().map((coords) => coords[1]));

const getCaves = () => {
  let cavesMatrix = Array.from({ length: yMax + 3 }, () =>
    Array(xMax).fill(".")
  );

  const line = (from, to) => {
    let min = [Math.min(from[0], to[0]), Math.min(from[1], to[1])];
    let max = [Math.max(from[0], to[0]), Math.max(from[1], to[1])];
    for (let i = min[0]; i <= max[0]; i++) {
      for (let j = min[1]; j <= max[1]; j++) {
        cavesMatrix[j][i] = "#";
      }
    }
  };

  cavesInput.forEach((point) => {
    point.forEach((p, i) => {
      i && line(point[i - 1], p);
    });
  });

  return cavesMatrix;
};

const dropSand = (cavesMatrix, part2) => {
  let sand = sandStartingCoord.slice();
  let endlessPouring = false;

  while (true) {
    if (sand[1] > yMax + 1) {
      endlessPouring = true;
      break;
    }
    if (cavesMatrix[sand[1] + 1][sand[0]] == ".") {
      sand[1]++;
      continue;
    }
    if (cavesMatrix[sand[1] + 1][sand[0] - 1] == ".") {
      sand[1]++;
      sand[0]--;
      continue;
    }
    if (cavesMatrix[sand[1] + 1][sand[0] + 1] == ".") {
      sand[1]++;
      sand[0]++;
      continue;
    }
    break;
  }

  cavesMatrix[sand[1]][sand[0]] = "o";
  return part2 ? sand[1] == 0 : endlessPouring;
};

const simulate = (part2 = false, drops = 0) => {
  if (part2)
    cavesInput.push([
      [0, yMax + 2],
      [xMax * 2, yMax + 2],
    ]);
  let caves = getCaves();
  while (!dropSand(caves, part2)) drops++;
  return drops;
};

console.log(simulate());
console.log(simulate(true) + 1);
