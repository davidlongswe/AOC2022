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

const pairSets = input.map((pairSet) => {
  return {
    firstPair: new Set(
      getRange(
        pairSet.firstPair[1] - pairSet.firstPair[0] + 1,
        pairSet.firstPair[0]
      )
    ),
    secondPair: new Set(
      getRange(
        pairSet.secondPair[1] - pairSet.secondPair[0] + 1,
        pairSet.secondPair[0]
      )
    ),
  };
});

const part1 = (sets) => {
  let fullyContainedSections = 0;
  for (let set of sets) {
    if (
      getDifference(set.firstPair, set.secondPair).size === 0 ||
      getDifference(set.secondPair, set.firstPair).size === 0
    ) {
      fullyContainedSections++;
    }
  }
  return fullyContainedSections;
};

const part2 = (sets) => {
  let sectionsInCommon = 0;
  for (let set of sets) {
    if (
      getOverlap(set.firstPair, set.secondPair).size > 0 ||
      getOverlap(set.secondPair, set.firstPair).size > 0
    ) {
      sectionsInCommon++;
    }
  }
  return sectionsInCommon;
};

console.log(part1(pairSets), part2(pairSets));
