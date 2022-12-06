const fs = require("fs");
const characters = fs.readFileSync("06.txt", { encoding: "utf-8" }).split("");

function duplicateExists(arr) {
  return new Set(arr).size !== arr.length;
}

const buffer = {
  charsChecked: 0,
  currArr: [],
};

const findMessageLoc = (messageLength) => {
  for (let c of characters) {
    buffer.currArr.push(c);
    buffer.charsChecked++;
    if (buffer.currArr.length === messageLength) {
      if (duplicateExists(buffer.currArr)) {
        buffer.currArr.shift();
      } else {
        break;
      }
    }
  }
  console.log(buffer.charsChecked);
  buffer.charsChecked = 0;
};

//part 1
findMessageLoc(4);
//part 2
findMessageLoc(14);
