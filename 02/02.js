const fs = require("fs");

const turns = fs
  .readFileSync("02.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => {
    const [opponentChoice, myChoice] = x.split(" ");
    return {
      opponentChoice,
      myChoice,
    };
  });

let scores = {
  totalScore: 0,
  rock: 1,
  paper: 2,
  scissors: 3,
  loss: 0,
  draw: 3,
  win: 6,
};

const task1 = (turns, scores) => {
  for (const turn of turns) {
    switch (turn.opponentChoice) {
      case "A":
        if (turn.myChoice === "X") {
          scores.totalScore += scores.rock + scores.draw;
        }
        if (turn.myChoice === "Y") {
          scores.totalScore += scores.paper + scores.win;
        }
        if (turn.myChoice === "Z") {
          scores.totalScore += scores.scissors + scores.loss;
        }
        break;
      case "B":
        if (turn.myChoice === "X") {
          scores.totalScore += scores.rock + scores.loss;
        }
        if (turn.myChoice === "Y") {
          scores.totalScore += scores.paper + scores.draw;
        }

        if (turn.myChoice === "Z") {
          scores.totalScore += scores.scissors + scores.win;
        }
        break;
      case "C":
        if (turn.myChoice === "X") {
          scores.totalScore += scores.rock + scores.win;
        }
        if (turn.myChoice === "Y") {
          scores.totalScore += scores.paper + scores.loss;
        }
        if (turn.myChoice === "Z") {
          scores.totalScore += scores.scissors + scores.draw;
        }

        break;
    }
  }
  console.log(scores.totalScore);
  scores.totalScore = 0;
};

const task2 = (turns, scores) => {
  for (const turn of turns) {
    switch (turn.opponentChoice) {
      case "A":
        if (turn.myChoice === "X") {
          scores.totalScore += scores.scissors + scores.loss;
        }
        if (turn.myChoice === "Y") {
          scores.totalScore += scores.rock + scores.draw;
        }
        if (turn.myChoice === "Z") {
          scores.totalScore += scores.paper + scores.win;
        }
        break;
      case "B":
        if (turn.myChoice === "X") {
          scores.totalScore += scores.rock + scores.loss;
        }
        if (turn.myChoice === "Y") {
          scores.totalScore += scores.paper + scores.draw;
        }

        if (turn.myChoice === "Z") {
          scores.totalScore += scores.scissors + scores.win;
        }
        break;
      case "C":
        if (turn.myChoice === "X") {
          scores.totalScore += scores.paper + scores.loss;
        }
        if (turn.myChoice === "Y") {
          scores.totalScore += scores.scissors + scores.draw;
        }
        if (turn.myChoice === "Z") {
          scores.totalScore += scores.rock + scores.win;
        }
        break;
    }
  }
  console.log(scores.totalScore);
  scores.totalScore = 0;
};

task1(turns, scores);
task2(turns, scores);
