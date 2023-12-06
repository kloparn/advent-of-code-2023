import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n").join("").split("\n");

const time = Number([...data[0].matchAll(/\d+/g)].reduce((acc, [val]) => `${acc}${val}`, ""));
const distance = Number([...data[1].matchAll(/\d+/g)].reduce((acc, [val]) => `${acc}${val}`, ""));

const timeValuesPossible = [];

let minRange = 0;
let maxRange = 0;
let index = 0;
while (index < time) {
  const value = index * time - index * index;
  if (value > distance) {
    minRange = index;
    break;
  }
  index++;
}

index = time;
while (index > minRange) {
  const value = index * time - index * index;
  if (value > distance) {
    maxRange = index;
    break;
  }
  index--;
}

timeValuesPossible.push(maxRange - minRange + 1);

console.log(timeValuesPossible.reduce((acc, cur) => acc * cur, 1));
