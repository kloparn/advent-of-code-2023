import fs from "fs/promises"

const data = (await fs.readFile("data", "utf-8")).trim().split("\n");

const nmrArrays = data.map((line) => {
  return line.split("").filter((char) => !isNaN(char)).map((nmr) => parseInt(nmr)).filter((nmr) => nmr);
});

const sizeNumbers = nmrArrays.map((arr) => parseInt(`${arr.at(0)}${arr.at(-1)}`))

const sum = sizeNumbers.reduce((a, b) => a + b, 0);

console.log(sum);