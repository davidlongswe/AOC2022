const { FORMERR } = require("dns");
const fs = require("fs");

const caveScan = fs
  .readFileSync("14.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) =>
    x
      .split(" -> ")
      .map((x) => x.split(","))
      .map((x) => {
        return {
          xCoord: parseInt(x[0]),
          yCoord: parseInt(x[1]),
        };
      })
  );

const getMinXCoord = () => {
  return caveScan
    .flat()
    .map((x) => x.xCoord)
    .sort((a, b) => a - b)[0];
};
const getMaxXCoord = () => {
  return caveScan
    .flat()
    .map((x) => x.xCoord)
    .sort((a, b) => b - a)[0];
};

const getMinYCoord = () => {
  return caveScan
    .flat()
    .map((x) => x.yCoord)
    .sort((a, b) => a - b)[0];
};

const getMaxYCoord = () => {
  return caveScan
    .flat()
    .map((x) => x.yCoord)
    .sort((a, b) => b - a)[0];
};

const drawObjectsOnCaveSlice = (caveSlice) => {
  caveSlice[0][500 - getMinXCoord()] = "+";
  for (let row of caveScan) {
    for (let i = 0; i < row.length; i++) {
      let xOrig = row[i].xCoord;
      let xDest = row[i + 1]?.xCoord;
      let yOrig = row[i].yCoord;
      let yDest = row[i + 1]?.yCoord;
      if (xOrig === xDest) {
        for (let j = 0; j < yDest - yOrig; j++) {
          console.log(i, j);
          caveSlice[yOrig - getMinYCoord() + j + 1][xOrig - getMinXCoord()] =
            "#";
        }
      }
      if (yOrig === yDest) {
        for (let j = 0; j < xDest - xOrig; j++) {
          console.log(i, j);
          //console.log(xDest, xOrig);
          caveSlice[yOrig - getMinYCoord()][xOrig - getMinXCoord() + j + 1] =
            "#";
        }
      }
    }
  }
};

const createCaveSlice = () => {
  const caveSliceWidth = getMaxXCoord() - getMinXCoord();
  const caveSliceDepth = getMaxYCoord();
  let caveSlice = [];
  for (let i = 0; i < caveSliceDepth; i++) {
    let caveSliceRow = [];
    for (let j = 0; j < caveSliceWidth; j++) {
      caveSliceRow.push(".");
    }
    caveSlice.push(caveSliceRow);
  }

  drawObjectsOnCaveSlice(caveSlice);

  return caveSlice;
};

const simulateSand = () => {};

const caveSlice = createCaveSlice();

console.log(caveSlice);
