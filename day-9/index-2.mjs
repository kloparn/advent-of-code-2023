import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const extrapolatedValues = data.reduce((extrapolatedValues, line, index, input) => {
  const numbers = line.split(" ").map(Number);

  const numberDifferences = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    const one = numbers[i];
    const two = numbers[i + 1];

    numberDifferences.push(two - one);
  }

  const extrapolatedSequence = [numbers, numberDifferences];

  while (!extrapolatedSequence.at(-1).every((diff) => diff === 0)) {
    const lastDifference = extrapolatedSequence.at(-1);

    const newDifferences = [];

    for (let i = 0; i < lastDifference.length - 1; i++) {
      const one = lastDifference[i];
      const two = lastDifference[i + 1];

      newDifferences.push(two - one);
    }

    extrapolatedSequence.push(newDifferences);
  }

  let sumOfNextValueInLine = 0;

  extrapolatedSequence.reverse();

  for (let i = 0; i < extrapolatedSequence.length - 1; i++) {
    const first = extrapolatedSequence[i][0];
    const firstOnNext = extrapolatedSequence[i + 1][0];

    extrapolatedSequence[i + 1].unshift(firstOnNext - first);

    if (extrapolatedSequence.length - 2 === i) {
      sumOfNextValueInLine += firstOnNext -first;
    }
  }

  return [...extrapolatedValues, sumOfNextValueInLine];
}, []);

console.log(extrapolatedValues.reduce((a, b) => a + b, 0));
