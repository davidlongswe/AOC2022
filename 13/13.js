const fs = require("fs");
const input = fs
  .readFileSync("13.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n\n")
  .map((group) => group.split("\n").map((pairHalf) => JSON.parse(pairHalf))); //Strings to arrays

const compare = (left, right) => {
  // Check if every element in the array is a number.
  // If this is true return right - left.
  if ([left, right].every((char) => +char === char)) return left - right;

  // If above false use map and + to convert left and right into a joined arrays of numbers only.
  [left, right] = [left, right].map((char) => (+char === char ? [char] : char));

  return (
    //  use reduce on left to compare each element in left with the corresponding element in right.
    //  If any two elements are not equal, then return the result of calling itself recursively on those two elements.
    //  If all elements in left are equal to right, then return left.length - right.length
    left.reduce((acc, char, i) => acc || compare(char, right[i] ?? char), 0) ||
    left.length - right.length
  );
};

const part1 = (input) => {
  const inOrderPairs = input
    .map((arrs, index) => [arrs, index])
    .filter(([[left, right]]) => compare(left, right) < 0);
  const fixOffByOne = inOrderPairs.map(([_, index]) => index + 1);
  console.log(
    fixOffByOne.reduce((sumOfIndexes, index) => sumOfIndexes + index)
  );
};

const dividers = [[[2]], [[6]]];

const part2 = (input) => {
  console.log(
    input
      .flat()
      .concat(dividers)
      .sort(compare)
      .map((arrs, index) => [arrs, index])
      .filter(([arr]) => dividers.some((pkt) => pkt === arr))
      .map(([, index]) => index + 1)
      .reduce((productOfIndex, index) => productOfIndex * index)
  );
};

part1(input);
part2(input);
