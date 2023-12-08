import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const [moves, nodes] = data.reduce(
  (acc, line, index) => {
    if (index === 0) return [line, []];
    const [nodeName, nodeLeft, nodeRight] = [...line.matchAll(/\w+/g)].map(String);
    if (!nodeName) return [acc[0], acc[1]];
    return [acc[0], { ...acc[1], [nodeName]: { L: nodeLeft, R: nodeRight } }];
  },
  [[], {}]
);

let movesTaken = 1;
const queue = [{ nextMove: nodes.AAA[moves[0]] }];
while (queue.length > 0) {
  const nextMove = moves[movesTaken++ % moves.length];

  const { nextMove: nextNode } = queue.shift();

  if (nextNode === "ZZZ") {
    break;
  }

  if (nextMove === "L") {
    queue.push({ nextMove: nodes[nextNode].L });
  } else if (nextMove === "R") {
    queue.push({ nextMove: nodes[nextNode].R });
  }
}

console.log("Part 1:", movesTaken - 1);
