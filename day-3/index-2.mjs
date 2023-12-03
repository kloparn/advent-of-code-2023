import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const numbersToSum = [];

const gears = {
  getSumOfNumbersAroundGears: () => {
    const sums = [];
    Object.entries(gears).forEach(([gearIndex, gear]) => {
      const { numbersAround } = gear;
      if (!numbersAround || numbersAround.length !== 2) {
        return;
      }
      const sum = numbersAround.reduce((acc, number) => acc * number, 1);
      sums.push(sum);
    });

    return sums.reduce((acc, number) => acc + number, 0);
  },
};

// find all gears and add them to gears object
for (const [lineIndex, line] of data.entries()) {
  const gearsOnLine = [...line.matchAll(/\*/g)];

  for (const regexMatch of gearsOnLine) {
    gears[`${lineIndex}:${regexMatch.index}`] = {
      numbersAround: [],
    };
  }
}

for (const [lineIndex, line] of data.entries()) {
  const digitsOnLine = [...line.matchAll(/\d+/g)];

  for (const regexMatch of digitsOnLine) {
    // check left || right || up || down if there is a special character, if so, add to numbersToSum
    // also check diagonals
    const nmr = regexMatch[0];
    const nmrIndex = regexMatch.index;

    for (let i = nmrIndex; i < nmrIndex + nmr.length; i++) {
      if (line[i - 1]?.match(/\*/)) {
        gears[`${lineIndex}:${i - 1}`].numbersAround.push(Number(nmr));
        break;
      }

      if (line[i + 1]?.match(/\*/)) {
        gears[`${lineIndex}:${i + 1}`].numbersAround.push(Number(nmr));
        break;
      }

      if (data[lineIndex - 1]?.[i]?.match(/\*/)) {
        gears[`${lineIndex - 1}:${i}`].numbersAround.push(Number(nmr));
        break;
      }

      if (data[lineIndex - 1]?.[i - 1]?.match(/\*/)) {
        gears[`${lineIndex - 1}:${i - 1}`].numbersAround.push(Number(nmr));
        break;
      }

      if (data[lineIndex - 1]?.[i + 1]?.match(/\*/)) {
        gears[`${lineIndex - 1}:${i + 1}`].numbersAround.push(Number(nmr));
        break;
      }

      if (data[lineIndex + 1]?.[i]?.match(/\*/)) {
        gears[`${lineIndex + 1}:${i}`].numbersAround.push(Number(nmr));
        break;
      }

      if (data[lineIndex + 1]?.[i - 1]?.match(/\*/)) {
        gears[`${lineIndex + 1}:${i - 1}`].numbersAround.push(Number(nmr));
        break;
      }

      if (data[lineIndex + 1]?.[i + 1]?.match(/\*/)) {
        gears[`${lineIndex + 1}:${i + 1}`].numbersAround.push(Number(nmr));
        break;
      }
    }
  }
}

console.log(gears.getSumOfNumbersAroundGears());
