import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const scratchCards = {};

// populate the cards
for (const row of data) scratchCards[Number(row.split(":")[0].match(/\d+/)[0])] = { amount: 1 };

for (const row of data) {
  const rowInformation = row.split(":");

  let cardNumber = Number(rowInformation[0].match(/\d+/)[0]);

  let winningNumbers = rowInformation[1].split("|")[0].split(" ");
  let cardNumbers = rowInformation[1].split("|")[1].split(" ");

  // remove empty strings in each array (if any)
  winningNumbers = winningNumbers.filter(Boolean).map(Number);
  cardNumbers = cardNumbers.filter(Boolean).map(Number);

  for (let i = 0; i < scratchCards[cardNumber].amount; i++) {
    const wonCards = cardNumbers.reduce((acc, cardNumber) => {
      if (winningNumbers.includes(cardNumber)) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    for (let i = 0; i < wonCards; i++) {
      scratchCards[cardNumber + 1 + i].amount += 1;
    }
  }
}

console.log(
  "Total points:",
  Object.values(scratchCards).reduce((acc, card) => acc + card.amount, 0)
);
