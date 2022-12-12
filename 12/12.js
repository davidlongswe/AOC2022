const fs = require("fs");
const data = fs.readFileSync("12.txt", { encoding: "utf-8" }).split("\r\n");

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getMapInfo = (part) => {
  const startingPoints = [];
  let end;
  const map = data.map((line, x) =>
    line.split("").map((char, y) => {
      let elevation;
      if (char === "S" || (part === 2 && char === "a")) {
        startingPoints.push([x, y]);
        return (elevation = 0);
      } else if (char === "E") {
        end = [x, y];
        return (elevation = 25);
      }
      return char.codePointAt(0) - "a".codePointAt(0);
    })
  );
  return { map: map, startingPoints: startingPoints, end: end };
};

const djikstras = (part) => {
  const { map, startingPoints, end } = getMapInfo(part);
  const queue = startingPoints.map((start) => ({ pos: start, steps: 0 }));
  const visited = [];
  while (queue.length) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();
    if (visited[i]?.[j]) {
      continue;
    }
    if (i === end[0] && j === end[1]) {
      console.log(steps);
      break;
    }
    for (const [di, dj] of dirs) {
      if (
        map[i + di]?.[j + dj] === undefined ||
        map[i + di][j + dj] > map[i][j] + 1 ||
        visited[i + di]?.[j + dj]
      ) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
    }
    visited[i] = visited[i] ?? [];
    visited[i][j] = 1;
  }
};

djikstras(1);
djikstras(2);
