import fs from "fs/promises";

const data = (await fs.readFile("data", "utf-8")).trim().split("\r\n");

const games = {};

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
  game.rules = {
    red: 1,
    blue: 1,
    green: 1,
  }
  for (const set of game.sets) {
    set.red > game.rules.red ? game.rules.red = set.red : null;
    set.blue > game.rules.blue ? game.rules.blue = set.blue : null;
    set.green > game.rules.green ? game.rules.green = set.green : null;
  }

  game.power = game.rules.red * game.rules.blue * game.rules.green;
}

const sumOfPowers = Object.values(games).reduce((acc, { power }) => acc + power, 0);

console.log(sumOfPowers)

