const fs = require("fs");
const instructions = fs
  .readFileSync("10.txt", { encoding: "utf-8" })
  .split("\r\n");

const FREQENCIES = [20, 60, 100, 140, 180, 220];

const part1 = () => {
  let x = 1;
  let totCycles = 0;
  let part1Res = 0;
  instructions.forEach((instruction) => {
    let [_, amount] = instruction.split(" ").map(Number);
    totCycles++;
    if (FREQENCIES.includes(totCycles)) part1Res += x * totCycles;

    if (amount) {
      totCycles++;
      if (FREQENCIES.includes(totCycles)) part1Res += x * totCycles;
      x += amount;
    }
  });
  console.log("Part one: " + part1Res);
};

const part2 = () => {
  let x = 1;
  let CRTx = -1;
  let CRT = [];
  let CRTLine = "";
  const hashOrSpace = x == CRTx || x == CRTx - 1 || x == CRTx + 1;
  instructions.forEach((instruction) => {
    let [_, amount] = instruction.split(" ");
    CRTx++;
    hashOrSpace ? (CRTLine += "#") : (CRTLine += " ");
    if (CRTx == 39) {
      CRT.push(CRTLine);
      CRTLine = "";
      CRTx = -1;
    }
    if (amount) {
      amount = parseInt(amount);
      CRTx++;
      hashOrSpace ? (CRTLine += "#") : (CRTLine += " ");
      if (CRTx == 39) {
        CRT.push(CRTLine);
        CRTLine = "";
        CRTx = -1;
      }
      x += amount;
    }
  });
  CRT.forEach((sym) => {
    console.log(sym);
  });
};

part1();
part2();
