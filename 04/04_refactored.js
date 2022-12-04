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

const getRange = (length, startingIndex) => {
  return [...Array(length).keys()].map((inc) => inc + startingIndex);
};

const setPairs = input.map((setPair) => {
  return {
    firstPair: new Set(
      getRange(
        setPair.firstPair[1] - setPair.firstPair[0] + 1,
        setPair.firstPair[0]
      )
    ),
    secondPair: new Set(
      getRange(
        setPair.secondPair[1] - setPair.secondPair[0] + 1,
        setPair.secondPair[0]
      )
    ),
  };
});

const part1 = (setPairs) => {
  let fullyContainedSections = 0;
  for (let set of setPairs) {
    if (
      getDifference(set.firstPair, set.secondPair).size === 0 ||
      getDifference(set.secondPair, set.firstPair).size === 0
    ) {
      fullyContainedSections++;
    }
  }
  return fullyContainedSections;
};

const part2 = (setPairs) => {
  let sectionsInCommon = 0;
  for (let set of setPairs) {
    if (
      getOverlap(set.firstPair, set.secondPair).size > 0 ||
      getOverlap(set.secondPair, set.firstPair).size > 0
    ) {
      sectionsInCommon++;
    }
  }
  return sectionsInCommon;
};

console.log(part1(setPairs), part2(setPairs));
