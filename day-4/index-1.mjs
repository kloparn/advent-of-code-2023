import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

let accumilatedPoints = 0;

for (const row of data) {
  const rowInformation = row.split(":");

  let winningNumbers = rowInformation[1].split("|")[0].split(" ");
  let cardNumbers = rowInformation[1].split("|")[1].split(" ");

  // remove empty strings in each array (if any)
  winningNumbers = winningNumbers.filter(Boolean).map(Number);
  cardNumbers = cardNumbers.filter(Boolean).map(Number);

  accumilatedPoints += cardNumbers.reduce((acc, cardNumber) => {
    if (winningNumbers.includes(cardNumber)) {
      if (acc === 0) return (acc = 1);
      return acc * 2;
    } else {
      return acc;
    }
  }, 0);
}

console.log("Total points:", accumilatedPoints);
