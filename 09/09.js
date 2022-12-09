const fs = require("fs");

const playerMoves = fs
  .readFileSync("09.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => {
    const [direction, steps] = x.split(" ");
    return {
      direction: direction,
      steps: parseInt(steps),
    };
  });

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  constructor() {
    this.position = new Position(0, 0);
    this.visPos = [];
  }

  move(dir, steps) {
    switch (dir) {
      case "R":
        for (let i = 0; i < steps; i++) {
          this.position.x++;
          this.visPos.push(new Position(this.position.x, this.position.y));
        }
        break;
      case "U":
        for (let i = 0; i < steps; i++) {
          this.position.y--;
          this.visPos.push(new Position(this.position.x, this.position.y));
        }
        break;
      case "L":
        for (let i = 0; i < steps; i++) {
          this.position.x--;
          this.visPos.push(new Position(this.position.x, this.position.y));
        }
        break;
      case "D":
        for (let i = 0; i < steps; i++) {
          this.position.y++;
          this.visPos.push(new Position(this.position.x, this.position.y));
        }
        break;
    }
  }
}

class AI {
  constructor() {
    this.position = new Position(0, 0);
    this.visPos = [];
  }

  move(pp) {
    const sameRow = pp.y === this.position.y;
    const sameCol = pp.x === this.position.x;
    const over = pp.y < this.position.y - 1;
    const under = pp.y > this.position.y + 1;
    const right = pp.x > this.position.x + 1;
    const left = pp.x < this.position.x - 1;

    //straights
    if (left && sameRow) {
      this.position.x--;
      this.visPos.push(new Position(this.position.x, this.position.y));
    } else if (right && sameRow) {
      this.position.x++;
      this.visPos.push(new Position(this.position.x, this.position.y));
    } else if (over && sameCol) {
      this.position.y--;
      this.visPos.push(new Position(this.position.x, this.position.y));
    } else if (under && sameCol) {
      this.position.y++;
      this.visPos.push(new Position(this.position.x, this.position.y));
    }
    //diagonals
    if (left && over) {
      this.position.x--;
      this.position.y--;
      this.visPos.push(new Position(this.position.x, this.position.y));
    } else if (right && under) {
      this.position.x++;
      this.position.y++;
      this.visPos.push(new Position(this.position.x, this.position.y));
    } else if (right && over) {
      this.position.x++;
      this.position.y--;
      this.visPos.push(new Position(this.position.x, this.position.y));
    } else if (left && under) {
      this.position.x--;
      this.position.y++;
      this.visPos.push(new Position(this.position.x, this.position.y));
    }
  }
}

const player = new Player();
const ai = new AI();

const chase = (p1, p2, p1moves) => {
  p1.visPos.push(new Position(0, 0));
  p2.visPos.push(new Position(0, 0));
  for (let move of p1moves) {
    p1.move(move.direction, move.steps);
  }
  for (let p1pos of p1.visPos) {
    p2.move(p1pos);
  }
};

//Part 1: AI # visited positions
chase(player, ai, playerMoves);

console.log(player.visPos);
console.log(ai.visPos);
