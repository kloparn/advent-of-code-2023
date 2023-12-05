export default function parse(input) {
  const seeds = input.match(/seeds: ([\d ]+)/)[1].split(" ").map(Number);
  const seedToSoilMap = [...input.match(/seed-to-soil map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, seed]) => seed).map(Number);
  const soilToFertilizerMap = [...input.match(/soil-to-fertilizer map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, fertilizer]) => fertilizer).map(Number);
  const fertilizerToWaterMap = [...input.match(/fertilizer-to-water map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, water]) => water).map(Number);
  const waterToLightMap = [...input.match(/water-to-light map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, light]) => light).map(Number);
  const lightToTemperatureMap = [...input.match(/light-to-temperature map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, temperature]) => temperature).map(Number);
  const temperatureToHumidityMap = [...input.match(/temperature-to-humidity map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, humidity]) => humidity).map(Number);
  const humidityToLocationMap = [...input.match(/humidity-to-location map:\n([\d \n]+)/)[1].matchAll(/(\d+)/g)].map(([, location]) => location).map(Number);
  return { seeds, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap };
}
