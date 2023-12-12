import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\n");

const [horizontalIncreases, verticalIncreases] = data.reduce(
  (vectorIncreases, currLine, index) => {
    // horizontal check
    if (!currLine.includes("#")) {
      vectorIncreases[0].push(index);
    }

    // vertical check
    const verticalArr = data.map((line) => line[index]);
    if (!verticalArr.includes("#")) {
      vectorIncreases[1].push(index);
    }

    return vectorIncreases;
  },
  [[], []]
);

const galaxySpots = {};

const SPACING_PER_INCREASE = 1_000_000;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === ".") continue;

    let horizontalIncrease = horizontalIncreases.findIndex((increase) => increase > i);
    let verticalIncrease = verticalIncreases.findIndex((increase) => increase > j);

    if (horizontalIncrease === -1) horizontalIncrease = horizontalIncreases.length;
    if (verticalIncrease === -1) verticalIncrease = verticalIncreases.length;

    horizontalIncrease *= SPACING_PER_INCREASE - 1;
    verticalIncrease *= SPACING_PER_INCREASE - 1;

    galaxySpots[`${i + horizontalIncrease},${j + verticalIncrease}`] = 1;
  }
}

const pairs = {};

for (const spot1 in galaxySpots) {
  for (const spot2 in galaxySpots) {
    if (spot1 === spot2 || pairs[`${spot2}|${spot1}`] === 0) continue;

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

const distance = Object.values(pairs).reduce((a, b) => a + b, 0);

console.log(distance);
