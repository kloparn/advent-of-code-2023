import fs from "fs/promises";
import parseData from "./parse.mjs";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r").join("");

function chunkArray(arr) {
  const chunked = [];
  for (let i = 0; i < arr.length; i += 3) {
    chunked.push(arr.slice(i, i + 3));
  }
  return chunked;
}

const Almanac = parseData(data);

const stepInstructions = [
  chunkArray(Almanac.seedToSoilMap),
  chunkArray(Almanac.soilToFertilizerMap),
  chunkArray(Almanac.fertilizerToWaterMap),
  chunkArray(Almanac.waterToLightMap),
  chunkArray(Almanac.lightToTemperatureMap),
  chunkArray(Almanac.temperatureToHumidityMap),
  chunkArray(Almanac.humidityToLocationMap),
];

const locationSeeds = JSON.parse(JSON.stringify(Almanac.seeds));

for (const instruction of stepInstructions) {
  let ranges = [];

  const stepranges = [];
  // calculate ranges on what seeds go from destination to source
  for (const [destRangeStart, sourceRangeStart, rangeLength] of instruction) {
    const destRange = [destRangeStart, destRangeStart + rangeLength - 1];
    const sourceRange = [sourceRangeStart, sourceRangeStart + rangeLength - 1];

    stepranges.push([destRange, sourceRange]);
  }

  ranges.push(stepranges);

  for (const [index, seed] of locationSeeds.entries()) {
    for (const mapRanges of ranges) {
      for (const [destRange, sourceRange] of mapRanges) {
        if (seed >= sourceRange[0] && seed <= sourceRange[1]) {
          locationSeeds[index] = seed - sourceRange[0] + destRange[0];
        }
      }
    }
  }
}

// we take the smallest number from the location seeds
console.log(locationSeeds.reduce((a, b) => Math.min(a, b)));
