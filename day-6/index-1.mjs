import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n").join("").split("\n");

const times = [...data[0].matchAll(/\d+/g)].map(([val]) => Number(val));
const distances = [...data[1].matchAll(/\d+/g)].map(([val]) => Number(val));

const timeValuesPossible = [];

for (const [i, time] of times.entries()) {
  const recordDistance = distances[i];

  let minRange = 0;
  let maxRange = 0;
  let index = 0;
  while (index < time) {
    const value = Array.from({ length: time - index }, () => index).reduce((acc, cur) => acc + cur, 0);
    if (value > recordDistance) {
      minRange = index;
      break;
    }
    index++;
  }

  index = time;
  while (index > minRange) {
    const value = Array.from({ length: time - index }, () => index).reduce((acc, cur) => acc + cur, 0);
    if (value > recordDistance) {
      maxRange = index;
      break;
    }
    index--;
  }

  timeValuesPossible.push(maxRange - minRange + 1);
}

console.log(timeValuesPossible.reduce((acc, cur) => acc * cur, 1));
