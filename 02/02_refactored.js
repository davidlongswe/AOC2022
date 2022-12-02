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

turns.map((turn) => {
  turn.opponentChoice =
    turn.opponentChoice === "A"
      ? "rock"
      : turn.opponentChoice === "B"
      ? "paper"
      : turn.opponentChoice === "C"
      ? "scissors"
      : "";
  turn.myChoice =
    turn.myChoice === "X"
      ? "rock"
      : turn.myChoice === "Y"
      ? "paper"
      : turn.myChoice === "Z"
      ? "scissors"
      : "";
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

const Game = (turns, scores, instructions = 1) => {
  for (const turn of turns) {
    switch (turn.opponentChoice) {
      case "rock":
        if (turn.myChoice === "rock") {
          scores.totalScore +=
            instructions === 2
              ? scores.scissors + scores.loss
              : scores.rock + scores.draw;
        }
        if (turn.myChoice === "paper") {
          scores.totalScore +=
            instructions === 2
              ? scores.rock + scores.draw
              : scores.paper + scores.win;
        }
        if (turn.myChoice === "scissors") {
          scores.totalScore +=
            instructions === 2
              ? scores.paper + scores.win
              : scores.scissors + scores.loss;
        }
        break;
      case "paper":
        if (turn.myChoice === "rock") {
          scores.totalScore +=
            instructions === 2
              ? scores.rock + scores.loss
              : scores.rock + scores.loss;
        }
        if (turn.myChoice === "paper") {
          scores.totalScore +=
            instructions === 2
              ? scores.paper + scores.draw
              : scores.paper + scores.draw;
        }

        if (turn.myChoice === "scissors") {
          scores.totalScore +=
            instructions === 2
              ? scores.scissors + scores.win
              : scores.scissors + scores.win;
        }
        break;
      case "scissors":
        if (turn.myChoice === "rock") {
          scores.totalScore +=
            instructions === 2
              ? scores.paper + scores.loss
              : scores.rock + scores.win;
        }
        if (turn.myChoice === "paper") {
          scores.totalScore +=
            instructions === 2
              ? scores.scissors + scores.draw
              : scores.paper + scores.loss;
        }
        if (turn.myChoice === "scissors") {
          scores.totalScore +=
            instructions === 2
              ? scores.rock + scores.win
              : scores.scissors + scores.draw;
        }
        break;
    }
  }
  console.log(scores.totalScore);
  scores.totalScore = 0;
};

Game(turns, scores);
Game(turns, scores, 2);
