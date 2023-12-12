import fs from "fs/promises";
import parse from "./parse.mjs";

let data = parse((await fs.readFile("data", "utf-8")).trim().split("\n"));

const galaxySpots = {};

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === ".") continue;
    galaxySpots[`${i},${j}`] = { uniqueId: Object.keys(galaxySpots).length, neighbors: {} };
  }
}

const pairs = {};

for (const spot1 in galaxySpots) {
  for (const spot2 in galaxySpots) {
    if (spot1 === spot2) continue;

    pairs[`${spot1}|${spot2}`] = 0;
  }
}

// Calculate the distance between each pair of spots
for (const pair in pairs) {
  const [spot1, spot2] = pair.split("|");
  const [row1, column1] = spot1.split(",").map(Number);
  const [row2, column2] = spot2.split(",").map(Number);
  const distance = Math.abs(row1 - row2) + Math.abs(column1 - column2);
  pairs[pair] = distance;
}

console.log(Object.values(pairs).reduce((a, b) => a + b, 0) / 2);
