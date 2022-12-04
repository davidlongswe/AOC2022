const fs = require("fs");

const input = fs
  .readFileSync("04.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => {
    const [firstPair, secondPair] = x.split(",");
    return {
      firstPair: firstPair.split("-").map((x) => parseInt(x)),
      secondPair: secondPair.split("-").map((x) => parseInt(x)),
    };
  });

function getDifference(setA, setB) {
  return new Set([...setA].filter((element) => !setB.has(element)));
}

function getOverlap(setA, setB) {
  return new Set([...setA].filter((element) => setB.has(element)));
}

const day4 = (input) => {
  let commonPairsAmt = 0;
  let overlapAtAll = 0;
  for (let i = 0; i < input.length; i++) {
    let firstPairRange = [
      ...Array(input[i].firstPair[1] - input[i].firstPair[0] + 1).keys(),
    ].map((num) => num + input[i].firstPair[0]);

    let secondPairRange = [
      ...Array(input[i].secondPair[1] - input[i].secondPair[0] + 1).keys(),
    ].map((num) => num + input[i].secondPair[0]);

    let s1 = new Set(firstPairRange);
    let s2 = new Set(secondPairRange);

    if (getDifference(s1, s2).size === 0 || getDifference(s2, s1).size === 0) {
      commonPairsAmt++;
    }

    if (getOverlap(s1, s2).size > 0 || getOverlap(s2, s1).size > 0) {
      overlapAtAll++;
    }
  }
  console.log(commonPairsAmt);
  console.log(overlapAtAll);
};

day4(input);
