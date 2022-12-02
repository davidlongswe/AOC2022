const fs = require("fs");

//Read file, split output on \r\n & parse all elements to integers.
const data = fs
  .readFileSync("01.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => parseInt(x));

//part 1

//Get the total amount of calories each elf withholds.
//Function : Loops through data, adding each element until the element is of type NaN.
//           Push the sum of each elf into an array on each blank row and reset the sum.
const getElfTotalCalorieArr = (data) => {
  let elfSums = [];
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    if (isNaN(data[i]) || i === data.length - 1) {
      elfSums.push(sum);
      sum = 0;
    } else {
      sum += data[i];
    }
  }
  return elfSums;
};

//Calculates the max value of all elf total calories.
const max = Math.max(...getElfTotalCalorieArr(data));

//part 2
//Function : Sorts the resulting sums from getElfTotalCalorieArr in ascending order, slices
//           the last three elements of the sorted array and calculates the sum.
const sumTopThreeElves = [...getElfTotalCalorieArr(data)]
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((partialSum, next) => partialSum + next, 0);

const day1 = `DAY 1: Part 1: ${max} Part 2: ${sumTopThreeElves}`;

console.log(day1, ...getElfTotalCalorieArr(data));
