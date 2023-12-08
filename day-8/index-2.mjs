import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\n");

const [moves, nodes, players] = data.reduce(
  (acc, line, index) => {
    if (index === 0) return [line, []];
    const [nodeName, nodeLeft, nodeRight] = [...line.matchAll(/\w+/g)].map(String);
    if (!nodeName) return [acc[0], acc[1]];
    if (nodeName[2] === "A") acc[2] = { ...acc[2], [`player:${nodeName}`]: 1 };
    return [acc[0], { ...acc[1], [nodeName]: { L: nodeLeft, R: nodeRight } }, acc[2]];
  },
  [[], {}, {}]
);

let queue = [];

// populate the queue with the ghost players first move.
Object.entries(players).forEach(([playerName]) => queue.push({ nextMoves: nodes[playerName.split(":")[1]], position: playerName.split(":")[1], movesTaken: 0 }));

let turnsTaken = 0;
while (true) {
  const nextMove = moves[turnsTaken++ % moves.length];
  for (let i = 0; i < queue.length; i++) {
    // this player has moved to its destination with X moves.
    // Do this with all players.
    // After all players are done, use GCD to find the LCM of all the moves taken.
    if (queue[i].position[2] === "Z") continue;
    let { nextMoves: connectedNodes, movesTaken } = queue[i];
    movesTaken++;

    const nextNode = connectedNodes[nextMove];
    queue[i] = { nextMoves: nodes[nextNode], position: nextNode, movesTaken };
  }

  // We check if all the players have reached a node where the last character is "Z" if so we break.
  if (queue.every(({ position }) => position[position.length - 1] === "Z")) break;

  if (turnsTaken % 10000000 === 0) console.log("Turns taken:", turnsTaken);
}

const lcmNums = queue.map(({ movesTaken }) => movesTaken);

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const lcm = (a, b) => (a * b) / gcd(a, b);

console.log(
  "Part 2:",
  lcmNums.reduce((acc, num) => lcm(acc, num))
);
