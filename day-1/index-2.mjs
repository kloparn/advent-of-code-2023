import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8"))
  .trim()
  .replaceAll("one", "o1e")
  .replaceAll("two", "t2o")
  .replaceAll("three", "t3e")
  .replaceAll("four", "f4r")
  .replaceAll("five", "f5e")
  .replaceAll("six", "s6x")
  .replaceAll("seven", "s7n")
  .replaceAll("eight", "e8t")
  .replaceAll("nine", "n9e")
  .split("\r\n");

const nmrArrays = data.map((line) => line.split("").filter((char) => !isNaN(char)));

const sizeNumbers = nmrArrays.map((arr) => `${arr.at(0)}${arr.at(-1)}`);

const sum = sizeNumbers.reduce((a, b) => parseInt(a) + parseInt(b), 0);

console.log(sum);

/* can use this if we want to use a mapping object instead of chaining replaceAll calls 


  const nmrMapping = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}

const parsedData = data.map((line) => { 
  let str = line;

  for (const [key, value] of Object.entries(nmrMapping)) {
    str = str.replaceAll(key, `${key.at(0)}${value}${key.at(-1)}`);
  }

  return str;
});


*/
