import fs from "fs/promises";
import parseData from "./parse.mjs";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n").join("");

function chunkArray(arr) {
  const chunked = [];
  for (let i = 0; i < arr.length; i += 3) {
    chunked.push(arr.slice(i, i + 3));
  }
  return chunked;
}

const Almanac = parseData(data);
Almanac.seeds = Almanac.seeds.reduce((seeds, seed, index) => {
  if (index % 2 === 0) {
    return [...seeds, seed];
  } else {
    seed = seed + seeds[index - 1];
    return [...seeds, seed];
  }
}, []);

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
  const stepRanges = [];
  // calculate ranges on what seeds go from destination to source
  for (const [destRangeStart, sourceRangeStart, rangeLength] of instruction) {
    stepRanges.push({
      floor: sourceRangeStart,
      ceiling: sourceRangeStart + rangeLength,
      mapping: destRangeStart - sourceRangeStart,
    });
  }

  const seedLength = locationSeeds.length;
  outerLoop: for (let i = 0; i < seedLength; i += 2) {
    let [startSeedRange, endSeedRange] = [locationSeeds[i], locationSeeds[i + 1]];

    for (const range of stepRanges) {
      // guard for the range not even needed to be changed, step into other range.
      if (endSeedRange < range.floor || startSeedRange > range.ceiling) {
        continue;
      }

      // all the seed is within the range
      if (endSeedRange <= range.ceiling && startSeedRange >= range.floor) {
        locationSeeds[i] = startSeedRange + range.mapping;
        locationSeeds[i + 1] = endSeedRange + range.mapping;
        continue outerLoop;
      }

      // some lower part of the seed is within the range
      if (endSeedRange <= range.ceiling && startSeedRange < range.floor) {
        // we add the part of the range that was not in the source range back into the seeds.
        locationSeeds.push(startSeedRange);
        locationSeeds.push(range.floor - 1);

        // we manipulate the range to fit within the source to then map it.
        startSeedRange = range.floor;

        locationSeeds[i] = startSeedRange + range.mapping;
        locationSeeds[i + 1] = endSeedRange + range.mapping;
        continue outerLoop;
      }

      // some upper part of the seed is within the range.
      if (endSeedRange > range.ceiling && startSeedRange >= range.floor) {
        //we add the part of the range that was not in the source range back into the seeds.
        locationSeeds.push(range.ceiling);
        locationSeeds.push(endSeedRange);

        // we manipulate the range to fit within the source to then map it.
        endSeedRange = range.ceiling;
        locationSeeds[i] = startSeedRange + range.mapping;
        locationSeeds[i + 1] = endSeedRange + range.mapping;
        continue outerLoop;
      }
    }
  }
}

// we take the smallest number from the location seeds
console.log(Math.min(...locationSeeds));
