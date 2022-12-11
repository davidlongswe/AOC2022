const fs = require("fs");

const connections = fs
  .readFileSync("12_2021.txt", { encoding: "utf-8" })
  .split("\r\n");

const graph = {};

const createGraph = () => {
  connections.map((x) => {
    const [from, to] = x.split("-");
    if (!graph[from]) {
      graph[from] = [];
    }
    if (!graph[to]) {
      graph[to] = [];
    }
    graph[from].push(to);
    graph[to].push(from);

    return { from, to };
  });
};

createGraph();

const isSmallCave = (string) => {
  return /[a-z]/.test(string);
};

function part1() {
  function depthFirstSearch(node, visited, paths) {
    visited.push(node);

    if (node === "end") {
      paths.push(visited.join`,`);
      return;
    }

    for (const neighbor of graph[node]) {
      if (isSmallCave(neighbor) && visited.includes(neighbor)) {
        continue;
      }
      depthFirstSearch(neighbor, [...visited], paths);
    }
  }

  const paths = [];
  depthFirstSearch("start", [], paths);
  console.log(paths.length);
}

part1();

function part2() {
  function depthFirstSearch(node, visited, visitedTwiceAlready, paths) {
    visited.push(node);

    if (node === "end") {
      paths.push(visited.join`,`);
      return;
    }

    for (const neighbor of graph[node]) {
      if (neighbor === "start") {
        continue;
      }

      if (isSmallCave(neighbor) && visited.includes(neighbor)) {
        if (visitedTwiceAlready) {
          continue;
        }

        if (visited.filter((x) => x === neighbor).length >= 2) {
          continue;
        }

        depthFirstSearch(neighbor, [...visited], true, paths);
      } else {
        depthFirstSearch(neighbor, [...visited], visitedTwiceAlready, paths);
      }
    }
  }

  const paths = [];
  depthFirstSearch("start", [], false, paths);
  console.log(paths.length);
}

part2();
