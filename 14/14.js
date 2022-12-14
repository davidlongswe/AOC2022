const fs = require("fs");

const caveScan = fs
  .readFileSync("14.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((row) =>
    row
      .split(" -> ")
      .map((coords) => coords.split(","))
      .map((coord) => {
        return {
          xCoord: parseInt(coord[0]),
          yCoord: parseInt(coord[1]),
        };
      })
  );

class CaveObject {
  constructor(x, y, sym) {
    this.x = x;
    this.y = y;
    this.sym = sym;
  }
}

const placeObjectsInCave = (cave) => {
  for (let r of caveScan) {
    for (let i = 0; i < r.length - 1; i++) {
      let xOrig = r[i].xCoord;
      let yOrig = r[i].yCoord;
      let xDest = r[i + 1]?.xCoord;
      let yDest = r[i + 1]?.yCoord;
      if (xOrig === xDest) {
        for (let j = yOrig; j < yDest + 1; j++) {
          let caveObj;
          for (let row in cave) {
            let tempCaveObj = row.find((obj) => obj.x === xOrig && obj.y === j);
            if (tempCaveObj) {
              caveObj = tempCaveObj;
            }
          }
          console.log(caveObj);
          //caveObj.sym = "#";
        }
      }
      if (yOrig === yDest) {
        let start = xOrig < xDest ? xOrig : xDest;
        let end = xDest > xOrig ? xDest : xOrig;
        for (let k = start; k < end + 1; k++) {
          let caveObj = cave[i].find((obj) => obj.y === yOrig && obj.x === k);
          //console.log("i:" + i, k, yOrig, caveObj);
          //caveObj.sym = "#";
        }
      }
    }
  }
  return cave;
};

const createCave = () => {
  let xCoords = caveScan.flat().map((x) => x.xCoord);
  let yCoords = caveScan.flat().map((x) => x.yCoord);
  let xMin = xCoords.sort((a, b) => a - b)[0];
  let xMax = xCoords.sort((a, b) => b - a)[0];
  let yMin = yCoords.sort((a, b) => a - b)[0];
  let yMax = yCoords.sort((a, b) => b - a)[0];

  let cave = [];

  for (let i = yMin; i < yMax + 1; i++) {
    let caveRow = [];
    for (let j = xMin; j < xMax + 1; j++) {
      caveRow.push(new CaveObject(j, i, "."));
    }
    cave.push(caveRow);
  }

  let caveWithObjs = placeObjectsInCave(cave);

  return caveWithObjs;
};

const simulateSand = () => {};

const cave = createCave();

console.log(cave);
