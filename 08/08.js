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

const createMap = (rowsOfTrees) => {
  const trees = [];
  for (let row = 0; row < rowsOfTrees.length; row++) {
    for (let col = 0; col < rowsOfTrees[row].length; col++) {
      let currTree = new Tree(col, row, rowsOfTrees[row][col]);
      if (
        row === 0 ||
        col === 0 ||
        row === rowsOfTrees.length - 1 ||
        col === rowsOfTrees[row].length - 1
      ) {
        currTree.isEdgeTree = true;
        currTree.visible = true;
      }
      trees.push(currTree);
    }
  }
  return trees;
};

const setVisibilityOfInnerTrees = (trees) => {
  for (let i = 0; i < trees.length; i++) {
    let currTree = trees[i];
    if (currTree.isEdgeTree) {
      continue;
    }
    let colBelow = trees.filter(
      (tree) => tree.x === currTree.x && tree.y > currTree.y
    );
    let colAbove = trees.filter(
      (tree) => tree.x === currTree.x && tree.y < currTree.y
    );

    let rowRight = trees.filter(
      (tree) => tree.y === currTree.y && tree.x > currTree.x
    );
    let rowLeft = trees.filter(
      (tree) => tree.y === currTree.y && tree.x < currTree.x
    );
    if (
      colAbove.every((tree) => tree.height < currTree.height) ||
      colBelow.every((tree) => tree.height < currTree.height) ||
      rowRight.every((tree) => tree.height < currTree.height) ||
      rowLeft.every((tree) => tree.height < currTree.height)
    ) {
      currTree.visible = true;
    } else {
      currTree.visible = false;
    }
  }
};

const getMaxScenicScore = (trees) => {
  let scenicScores = [];
  for (let i = 0; i < trees.length; i++) {
    let currTree = trees[i];
    if (currTree.isEdgeTree) {
      continue;
    }
    let scenicScoreBelow = 0;
    let scenicScoreAbove = 0;
    let scenicScoreRight = 0;
    let scenicScoreLeft = 0;

    let treesBelow = trees.filter(
      (tree) => tree.x === currTree.x && tree.y > currTree.y
    );

    for (let j = 0; j < treesBelow.length; j++) {
      if (treesBelow[j].height >= currTree.height) {
        scenicScoreBelow++;
        break;
      }
      if (treesBelow[j].height < currTree.height) {
        scenicScoreBelow++;
      }
    }

    let treesAbove = trees
      .filter((tree) => tree.x === currTree.x && tree.y < currTree.y)
      .reverse();

    for (let j = 0; j < treesAbove.length; j++) {
      if (treesAbove[j].height >= currTree.height) {
        scenicScoreAbove++;
        break;
      }
      if (treesAbove[j].height < currTree.height) {
        scenicScoreAbove++;
      }
    }

    let treesRight = trees.filter(
      (tree) => tree.y === currTree.y && tree.x > currTree.x
    );

    for (let j = 0; j < treesRight.length; j++) {
      if (treesRight[j].height >= currTree.height) {
        scenicScoreRight++;
        break;
      }
      if (treesRight[j].height < currTree.height) {
        scenicScoreRight++;
      }
    }

    let treesLeft = trees
      .filter((tree) => tree.y === currTree.y && tree.x < currTree.x)
      .reverse();
    for (let j = 0; j < treesLeft.length; j++) {
      if (treesLeft[j].height >= currTree.height) {
        scenicScoreLeft++;
        break;
      }
      if (treesLeft[j].height < currTree.height) {
        scenicScoreLeft++;
      }
    }

    scenicScores.push(
      scenicScoreAbove * scenicScoreBelow * scenicScoreLeft * scenicScoreRight
    );
  }
  return scenicScores.sort((a, b) => b - a)[0];
};

const trees = createMap(treeRows);
setVisibilityOfInnerTrees(trees);

const getVisibleTrees = (trees) => {
  return trees.filter((tree) => tree.visible).length;
};

//part 1
console.log(getVisibleTrees(trees));

//part 2
console.log(getMaxScenicScore(trees));
