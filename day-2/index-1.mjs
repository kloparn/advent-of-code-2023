import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const games = {};

const rules = {
  red: 12,
  blue: 14,
  green: 13,
};


for (const [index, line] of data.entries()) {
  games[index + 1] = {
    sets: [],
  };

  const sets = line.split(":")[1].split(";");

  for (const set of sets) {
    const redCubes = [...set.matchAll(/(\d+) red/g)];
    const blueCubes = [...set.matchAll(/(\d+) blue/g)];
    const greenCubes = [...set.matchAll(/(\d+) green/g)];

    const cubes = {
      red: redCubes.reduce((acc, [, count]) => acc + Number(count), 0),
      blue: blueCubes.reduce((acc, [, count]) => acc + Number(count), 0),
      green: greenCubes.reduce((acc, [, count]) => acc + Number(count), 0),
    };

    // delete empty cubes
    Object.entries(cubes).forEach(([key, count]) => count === 0 && delete cubes[key]);

    games[index + 1].sets.push(cubes);
  }
}


for (const [key, game] of Object.entries(games)) {
  for (const set of game.sets) {
    if (set.blue > rules.blue || set.red > rules.red || set.green > rules.green) {
      delete games[key];
      break;
    }
  }
}

const sumOfGamesIds = Object.keys(games).reduce((acc, id) => acc + Number(id), 0);

console.log(sumOfGamesIds)

