import fs from "fs/promises";
import { rules2 as rules } from "./helper.mjs";

const data = (await fs.readFile("data", "utf-8")).trim().split(/\r?\n/);

const standings = {
  ...Array.from({ length: data.length }, () => null),
};

const groups = {
  unique: [],
  onePair: [],
  twoPairs: [],
  threeOfAKind: [],
  fullHouse: [],
  fourOfAKind: [],
  fiveOfAKind: [],
};

const getStrongestfaceValueInHand = (cards) => {
  if (!cards.includes("J")) return "";

  const jokerAmount = [...cards].filter((card) => card === "J").length;

  if (jokerAmount === 5) return "J";

  cards = cards.replace(/J/g, "");

  const amountOfEachFaceValue = [...cards].reduce((acc, card) => ({ ...acc, [card]: acc[card] ? acc[card] + 1 : 1 }), {});

  // as no J exists in the hand, we can assume there is at most 4 cards.

  return Object.entries(amountOfEachFaceValue).reduce((bestFaceValue, [faceValue, amount]) => {
    if (amountOfEachFaceValue[bestFaceValue] < amount) return faceValue;
    return bestFaceValue;
  }, cards[0]);
};

for (const hand of data) {
  const [cards, points] = hand.split(" ");
  // We replace J within the cards to make the hand as strong as possible.
  const adjustedCards = cards.replace(/J/g, getStrongestfaceValueInHand(cards));

  const uniqueCards = [...new Set(adjustedCards.split(""))];
  const dublicateCards = Object.entries([...adjustedCards].reduce((acc, card) => ({ ...acc, [card]: acc[card] ? acc[card] + 1 : 1 }), {}))
    .filter(([_, amount]) => amount > 1)
    .map(([faceValue]) => faceValue);

  if (uniqueCards.length === 5) {
    groups.unique.push({ cards, points });
  } else if (uniqueCards.length === 4) {
    groups.onePair.push({ cards, points });
  } else if (uniqueCards.length === 3) {
    if (dublicateCards.length === 1) {
      groups.threeOfAKind.push({ cards, points });
    } else {
      groups.twoPairs.push({ cards, points });
    }
  } else if (uniqueCards.length === 2) {
    if (dublicateCards.length === 1) {
      groups.fourOfAKind.push({ cards, points });
    } else {
      groups.fullHouse.push({ cards, points });
    }
  } else {
    groups.fiveOfAKind.push({ cards, points });
  }
}

let rankIndex = 0;
// navigate through each group and find their rank.
for (const group of Object.values(groups)) {
  if (group.length === 0) continue;
  const sortedGroup = group.sort((a, b) => {
    // we check each faceValue at a time and compare their values.
    for (let i = 0; i < 5; i++) {
      const faceValueA = a.cards[i];
      const faceValueB = b.cards[i];
      const rankA = rules[faceValueA];
      const rankB = rules[faceValueB];
      if (rankA < rankB) {
        return -1;
      } else if (rankA > rankB) {
        return 1;
      }
    }
  });

  for (const { points, cards } of sortedGroup) {
    standings[rankIndex++] = { points, cards };
  }
}

const sumOfRanks = Object.entries(standings).reduce((sum, [rank, { points }]) => sum + Number(points) * (Number(rank) + 1), 0);

console.log({ sumOfRanks });
