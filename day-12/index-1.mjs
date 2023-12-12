import fs from "fs/promises";
import { countSpring, isArrayEqual } from "./utils.mjs";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const [springs, records] = data.reduce(
  (data, line) => {
    const [condition, recordedCondition] = line.split(" ");

    return [
      [...data[0], condition],
      [...data[1], recordedCondition],
    ];
  },
  [[], []]
);

const combinations = (conditionArray, index, n) => {
  // We are done with recursion when the index is equal to the length of the array
  if (index === conditionArray.length) {
    return isArrayEqual(countSpring(conditionArray), records[n].split(",")) && sumOfArrangements++;
  }

  if (conditionArray[index] === "?") {
    conditionArray[index] = ".";
    combinations(conditionArray, index + 1, n);
    conditionArray[index] = "#";
    combinations(conditionArray, index + 1, n);
    conditionArray[index] = "?";
  } else {
    // If the current index is not a question mark, we call the function again with the new array
    combinations(conditionArray, index + 1, n);
  }
};

let sumOfArrangements = 0;
for (const [index, spring] of springs.entries()) {
  const stringArr = spring.split("");
  combinations(stringArr, 0, index);
}

console.log(sumOfArrangements);
