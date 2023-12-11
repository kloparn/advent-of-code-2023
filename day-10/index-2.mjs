import fs from "fs/promises";
import { symbolPathDirection, pathIncrease } from "./utiljs.mjs";

const data = (await fs.readFile("data", "utf-8")).trim().split("\n");

const startPosition = { y: data.findIndex((line) => line.includes("S")), x: data[data.findIndex((line) => line.includes("S"))].indexOf("S") };

const visitedPositions = { [`${startPosition.y},${startPosition.x}`]: 0 };

// we add all directions in the queue.

const queue = [
  { position: { y: startPosition.y - 1, x: startPosition.x }, steps: 0, direction: "N" },
  { position: { y: startPosition.y, x: startPosition.x + 1 }, steps: 0, direction: "E" },
  { position: { y: startPosition.y + 1, x: startPosition.x }, steps: 0, direction: "S" },
  { position: { y: startPosition.y, x: startPosition.x - 1 }, steps: 0, direction: "W" },
];

while (queue.length) {
  let { position, steps, direction } = queue.shift();

  // check that we are not out of bounds.
  if (position.y < 0 || position.y >= data.length || position.x < 0 || position.x >= data[0].length) {
    continue;
  }

  // we get the symbol at this position.
  const symbol = data[position.y][position.x];

  // We find a spot where we cannot go further.
  if (symbol === ".") {
    continue;
  }

  if (visitedPositions[`${position.y},${position.x}`]) {
    continue;
  }

  // we mark this position as visited.
  visitedPositions[`${position.y},${position.x}`] = steps++;

  // we get the next direction.
  const nextDirection = symbolPathDirection?.[symbol]?.[direction];

  if (!nextDirection) {
    continue;
  }
  queue.push({
    position: { y: position.y + pathIncrease[nextDirection].y, x: position.x + pathIncrease[nextDirection].x },
    steps: steps,
    direction: nextDirection,
  });
}

// Visited positions now contains the whole loop.
// We create a new map with just the main loop
let mainLoopMap = Array.from({ length: data.length }, () => Array.from({ length: data[0].length - 1 }, () => "."));

for (const key of Object.keys(visitedPositions)) {
  const [y, x] = key.split(",").map(Number);
  mainLoopMap[y][x] = data[y][x];
}

mainLoopMap = mainLoopMap.reduce(
  (acc, line, y) => {
    line.forEach((symbol, x) => {
      acc[y * 2][x * 2] = symbol;

      if (symbol === "L") {
        acc[y * 2 - 1][x * 2] = "|";
        acc[y * 2][x * 2 + 1] = "-";
      }

      if (symbol === "F") {
        acc[y * 2 + 1][x * 2] = "|";
        acc[y * 2][x * 2 + 1] = "-";
      }

      if (symbol === "J") {
        acc[y * 2 - 1][x * 2] = "|";
        acc[y * 2][x * 2 - 1] = "-";
      }

      if (symbol === "7") {
        acc[y * 2 + 1][x * 2] = "|";
        acc[y * 2][x * 2 - 1] = "-";
      }

      if (symbol === "|") {
        acc[y * 2 - 1][x * 2] = "|";
        acc[y * 2 + 1][x * 2] = "|";
      }

      if (symbol === "-") {
        acc[y * 2][x * 2 - 1] = "-";
        acc[y * 2][x * 2 + 1] = "-";
      }

      if (symbol === "S") {
        if ((acc[y * 2 - 1]?.[x * 2] === "|" || acc[y * 2 + 1][x * 2] === "|") && (acc[y * 2][x * 2 - 1] === "-" || acc[y * 2][x * 2 + 1] === "-")) {
          if (acc[y * 2 - 1][x * 2] === ".") {
            acc[y * 2 - 1][x * 2] = "|";
          }
          if (acc[y * 2 + 1][x * 2] === ".") {
            acc[y * 2 + 1][x * 2] = "|";
          }
          if (acc[y * 2][x * 2 - 1] === ".") {
            acc[y * 2][x * 2 - 1] = "-";
          }
          if (acc[y * 2][x * 2 + 1] === ".") {
            acc[y * 2][x * 2 + 1] = "-";
          }
        }
      }
    });

    return acc;
  },
  [...Array(mainLoopMap.length * 2)].map(() => [...Array(mainLoopMap[0].length * 2)].map(() => "!"))
);

// get the positions of "!", but only look at the outerRim, they are voids.;
const outerRim = mainLoopMap.reduce((acc, line, y) => {
  if (y === 0 || y === mainLoopMap.length - 1) {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === "!") {
        acc.push({ y, x });
      }
    }
  } else {
    if (line[0] === "!") {
      acc.push({ y, x: 0 });
    } else if (line.at(-1) === "!") {
      acc.push({ y, x: line.length - 1 });
    }
  }
  return acc;
}, []);

const queue2 = [...outerRim];
const visitedPositions2 = {};

while (queue2.length) {
  const { y, x } = queue2.shift();

  if (y < 0 || y >= mainLoopMap.length || x < 0 || x >= mainLoopMap[0].length) {
    continue;
  }

  if (["-", "|", "L", "J", "7", "F"].includes(mainLoopMap[y][x])) {
    continue;
  }

  if (mainLoopMap[y][x] === ".") {
    mainLoopMap[y][x] = "!";
  }

  if (visitedPositions2[`${y},${x}`]) {
    continue;
  }

  visitedPositions2[`${y},${x}`] = true;

  queue2.push({ y: y - 1, x });
  queue2.push({ y: y + 1, x });
  queue2.push({ y, x: x - 1 });
  queue2.push({ y, x: x + 1 });
}

// find how many "." are left

console.log(mainLoopMap.flat().filter((symbol) => symbol === ".").length);
