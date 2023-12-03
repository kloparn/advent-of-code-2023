import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const numbersToSum = [];

for (let [lineIndex, line] of data.entries()) {
  const digitsOnLine = [...line.matchAll(/\d+/g)];

  for (const regexMatch of digitsOnLine) {
    // check left || right || up || down if there is a special character, if so, add to numbersToSum
    // also check diagonals
    const nmr = regexMatch[0];
    const nmrIndex = regexMatch.index;

    for (let i = nmrIndex; i < nmrIndex + nmr.length; i++) {
      if (
        line[i - 1]?.match(/^[^\d\.]/) ||
        line[i + 1]?.match(/^[^\d\.]/) ||
        data[lineIndex - 1]?.[i]?.match(/^[^\d\.]/) ||
        data[lineIndex - 1]?.[i - 1]?.match(/^[^\d\.]/) ||
        data[lineIndex - 1]?.[i + 1]?.match(/^[^\d\.]/) ||
        data[lineIndex + 1]?.[i]?.match(/^[^\d\.]/) ||
        data[lineIndex + 1]?.[i - 1]?.match(/^[^\d\.]/) ||
        data[lineIndex + 1]?.[i + 1]?.match(/^[^\d\.]/)
      ) {
        numbersToSum.push(Number(nmr));
        break;
      }
    }
  }
}

const sum = numbersToSum.reduce((acc, number) => acc + number, 0);

console.log(sum);
