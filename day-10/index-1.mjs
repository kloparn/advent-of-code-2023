import fs from "fs/promises";
import { symbolPathDirection, pathIncrease } from "./utiljs.mjs";

const data = (await fs.readFile("data", "utf-8")).trim().split("\n");

data.forEach((line) => console.log(line));

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

const twoDArray = Array.from({ length: data.length }, () => Array.from({ length: data.length }, () => "."));

for (const [key, value] of Object.entries(visitedPositions)) {
  const [y, x] = key.split(",").map(Number);
  twoDArray[y][x] = value;
}

fs.writeFile("output", twoDArray.map((line) => line.join(" ")).join("\n"));

console.log(Object.values(visitedPositions).sort((a, b) => b - a)[0] + 1);
