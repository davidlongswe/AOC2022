const fs = require("fs");
const { allowedNodeEnvironmentFlags } = require("process");

const treeRows = fs
  .readFileSync("08.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => x.split("").map(Number));
class Tree {
  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.isEdgeTree = false;
    this.visible = false;
  }
}
const createMap = (rot) => {
  const trees = [];
  for (let r = 0; r < rot.length; r++) {
    for (let c = 0; c < rot[r].length; c++) {
      let currTree = new Tree(c, r, rot[r][c]);
      if (r == 0 || c == 0 || r == rot.length - 1 || c == rot[r].length - 1) {
        currTree.isEdgeTree = true;
        currTree.visible = true;
      }
      trees.push(currTree);
    }
  }
  setVisibilityOfInnerTrees(trees);
  return trees;
};
const setVisibilityOfInnerTrees = (ts) => {
  for (let t of ts) {
    let currTree = t;
    if (currTree.isEdgeTree) {
      continue;
    }
    let colBelow = ts.filter((tr) => tr.x === currTree.x && tr.y > currTree.y);
    let colAbove = ts.filter((tr) => tr.x === currTree.x && tr.y < currTree.y);
    let rowRight = ts.filter((tr) => tr.y === currTree.y && tr.x > t.x);
    let rowLeft = ts.filter((tr) => tr.y === currTree.y && tr.x < currTree.x);
    if (
      colAbove.every((tr) => tr.height < currTree.height) ||
      colBelow.every((tr) => tr.height < currTree.height) ||
      rowRight.every((tr) => tr.height < currTree.height) ||
      rowLeft.every((tr) => tr.height < currTree.height)
    ) {
      currTree.visible = true;
    } else {
      currTree.visible = false;
    }
  }
};

const increaseScore = (treeArr, currTree) => {
  let score = 0;
  for (let t of treeArr) {
    if (t.height >= currTree.height) {
      score++;
      break;
    }
    if (t.height < currTree.height) {
      score++;
    }
  }
  return score;
};

const getMaxScenicScore = (ts) => {
  let scores = [];
  let scoreBelow = 0;
  let scoreAbove = 0;
  let scoreRight = 0;
  let scoreLeft = 0;

  for (let t of ts) {
    let currTree = t;
    if (currTree.isEdgeTree) {
      continue;
    }
    let tsBelow = ts.filter((tr) => tr.x === currTree.x && tr.y > currTree.y);
    scoreBelow = increaseScore(tsBelow, currTree, scoreBelow);

    let tsAbove = ts
      .filter((tr) => tr.x === currTree.x && tr.y < currTree.y)
      .reverse();
    scoreAbove = increaseScore(tsAbove, currTree, scoreAbove);

    let tsRight = ts.filter((tr) => tr.y === currTree.y && tr.x > currTree.x);
    scoreRight = increaseScore(tsRight, currTree, scoreRight);

    let tsLeft = ts
      .filter((tr) => tr.y === currTree.y && tr.x < currTree.x)
      .reverse();
    scoreLeft = increaseScore(tsLeft, currTree, scoreLeft);

    scores.push(scoreAbove * scoreBelow * scoreLeft * scoreRight);
  }
  return scores.sort((a, b) => b - a)[0];
};

const treeMap = createMap(treeRows);

//part 1
console.log(treeMap.filter((tree) => tree.visible).length);

//part 2
console.log(getMaxScenicScore(treeMap));
