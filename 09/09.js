const fs = require("fs");

const moves = fs
  .readFileSync("09.txt", { encoding: "utf-8" })
  .split("\r\n")
  .map((x) => {
    const [direction, steps] = x.split(" ");
    return {
      direction: direction,
      steps: parseInt(steps),
    };
  });

const movesDef = {
  U: {
    x: 0,
    y: -1,
  },
  R: {
    x: 1,
    y: 0,
  },
  D: {
    x: 0,
    y: 1,
  },
  L: {
    x: -1,
    y: 0,
  },
};

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(direction) {
    const delta = movesDef[direction];
    this.x += delta.x;
    this.y += delta.y;
  }
  follow(position) {
    const dist = Math.max(
      Math.abs(this.x - position.x),
      Math.abs(this.y - position.y)
    );
    if (dist > 1) {
      const directionX = position.x - this.x;
      const directionY = position.y - this.y;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

const markVisited = (x, y, visited) => {
  visited.add(`${x}-${y}`);
};

const part1 = (moves) => {
  const head = new Position(0, 0);
  const tail = new Position(0, 0);
  const visited = new Set();
  markVisited(0, 0, visited);

  for (const move of moves) {
    for (let i = 0; i < move.steps; i++) {
      head.move(move.direction);
      tail.follow(head);
      markVisited(tail.x, tail.y, visited);
    }
  }
  console.log(visited.size);
};

const part2 = (moves) => {
  const knots = new Array(10).fill(0).map((_) => new Position(0, 0));
  const visited = new Set();
  markVisited(0, 0, visited);

  for (const move of moves) {
    for (let i = 0; i < move.steps; i++) {
      knots[0].move(move.direction);

      for (let knot = 1; knot < knots.length; knot++) {
        const currKnotPos = knots[knot];
        currKnotPos.follow(knots[knot - 1]);
      }
      const endOfRopePos = knots.at(-1);
      markVisited(endOfRopePos.x, endOfRopePos.y, visited);
    }
  }
  console.log(visited.size);
};

part1(moves);

part2(moves);
