const N = { y: -1, x: 0 };
const S = { y: 1, x: 0 };
const W = { y: 0, x: -1 };
const E = { y: 0, x: 1 };

const symbolPathDirection = {
  "|": { S: "S", N: "N" },
  "-": { W: "W", E: "E" },
  L: { W: "N", S: "E" },
  J: { E: "N", S: "W" },
  7: { E: "S", N: "W" },
  F: { N: "E", W: "S" },
};

const pathIncrease = {
  N: N,
  S: S,
  W: W,
  E: E,
};

export { symbolPathDirection, pathIncrease };
