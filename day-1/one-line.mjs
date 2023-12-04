import fs from "fs/promises"
console.log((await fs.readFile("data", "utf-8")).trim().split("\n").map((line) => line.split("").filter((char) => !isNaN(char)).map((nmr) => parseInt(nmr)).filter((nmr) => nmr)).map((arr) => parseInt(`${arr.at(0)}${arr.at(-1)}`)).reduce((a, b) => a + b, 0));

console.log((await fs.readFile("data", "utf-8")).trim().replaceAll("one", "o1e").replaceAll("two", "t2o").replaceAll("three", "t3e").replaceAll("four", "f4r").replaceAll("five", "f5e").replaceAll("six", "s6x").replaceAll("seven", "s7n").replaceAll("eight", "e8t").replaceAll("nine", "n9e").split("\r\n").map((line) => line.split("").filter((char) => !isNaN(char)).map((nmr) => parseInt(nmr)).filter((nmr) => nmr)).map((arr) => parseInt(`${arr.at(0)}${arr.at(-1)}`)).reduce((a, b) => a + b, 0));
