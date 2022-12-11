const fs = require("fs");
const data = fs.readFileSync("11.txt", { encoding: "utf-8" }).split("\r\n\r\n");
class Monkey {
  constructor(id, items, op, amount, divisor, catchers) {
    this.id = id;
    this.items = items;
    this.op = op;
    this.amount = amount;
    this.divisor = divisor;
    this.catchers = catchers;
    this.itemsInspected = 0;
  }
}
class Item {
  constructor(worryLevel) {
    this.worryLevel = worryLevel;
  }
  transform(operator, amount) {
    this.worryLevel =
      operator === "*"
        ? (this.worryLevel *= amount)
        : (this.worryLevel += amount);
  }
  divBy3() {
    this.worryLevel = Math.floor(this.worryLevel / 3);
  }
  divByDivProduct(divProduct) {
    this.worryLevel %= divProduct;
  }
  isDivisibleBy(divisor) {
    return this.worryLevel % divisor === 0 ? true : false;
  }
}

const getMonkeys = () => {
  const monkeys = [];
  for (let monkey of data) {
    let sItems = [];
    let monkeyInfo = monkey.split("\r\n");
    let monkeyId = +monkeyInfo[0].split(" ")[1].split("")[0];
    let monkeyItemWorryLevels = monkeyInfo[1].match(/\d+/gi).map(Number);
    for (let worryLevel of monkeyItemWorryLevels) {
      sItems.push(new Item(worryLevel));
    }
    let op = monkeyInfo[2].split(" ").at(-2);
    let amount = +monkeyInfo[2].split(" ").at(-1);
    let divisor = +monkeyInfo[3].match(/\d+/gi);
    let catchers = [
      +monkeyInfo[4].match(/\d+/gi),
      +monkeyInfo[5].match(/\d+/gi),
    ];
    monkeys.push(new Monkey(monkeyId, sItems, op, amount, divisor, catchers));
  }
  return monkeys;
};

const playKeepAway = (part) => {
  let monkeys = getMonkeys();
  let rounds = part === "p1" ? 20 : 10000;
  let divProduct = monkeys.map((x) => x.divisor).reduce((a, b) => a * b);
  for (let i = 0; i < rounds; i++) {
    for (let monkey of monkeys) {
      for (let item of monkey.items) {
        monkey.itemsInspected++;
        let multiplyBy = isNaN(monkey.amount) ? item.worryLevel : monkey.amount;
        item.transform(monkey.op, multiplyBy);
        if (part === "p1") {
          item.divBy3();
        } else if (part === "p2") {
          item.divByDivProduct(divProduct);
        }
        let catcher;
        if (item.isDivisibleBy(monkey.divisor)) {
          catcher = monkeys.find((m) => m.id === monkey.catchers[0]);
          catcher.items.push(item);
        } else {
          catcher = monkeys.find((m) => m.id === monkey.catchers[1]);
          catcher.items.push(item);
        }
        monkey.items = monkey.items.filter((monkey) => monkey.id !== monkey.id);
      }
    }
  }
  let sortedInspectedList = monkeys
    .map((m) => m.itemsInspected)
    .sort((a, b) => b - a);
  console.log(sortedInspectedList.at(0) * sortedInspectedList.at(1));
};
//part 1
playKeepAway("p1");
//part 2
playKeepAway("p2");
