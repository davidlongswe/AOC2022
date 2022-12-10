const fs = require("fs");
const instructions = fs
  .readFileSync("10.txt", { encoding: "utf-8" })
  .split("\r\n");

const FREQ = [20, 60, 100, 140, 180, 220];

let x = 1;
let totCycles = 0;
let part1Res = 0;

let CRTx = -1;
let CRT = [];
let CRTLine = "";

instructions.forEach((instruction) => {
  let [command, amount] = instruction.split(" ");
  totCycles++;
  CRTx++;
  x == CRTx || x == CRTx - 1 || x == CRTx + 1
    ? (CRTLine += "#")
    : (CRTLine += " ");

  if (CRTx == 39) {
    CRT.push(CRTLine);
    CRTLine = "";
    CRTx = -1;
  }

  if (FREQ.includes(totCycles)) partOne += x * totCycles;

  if (amount) {
    amount = parseInt(amount);
    totCycles++;
    CRTx++;
    x == CRTx || x == CRTx - 1 || x == CRTx + 1
      ? (CRTLine += "#")
      : (CRTLine += " ");

    if (CRTx == 39) {
      CRT.push(CRTLine);
      CRTLine = "";
      CRTx = -1;
    }

    if (FREQ.includes(totCycles)) partOne += x * totCycles;
    x += amount;
  }
});

console.log("Part one = " + part1Res);

CRT.forEach((sym) => {
  console.log(sym);
});
