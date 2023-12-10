import fs from "fs/promises"

const data = (await fs.readFile("example-data", "utf-8")).trim().split("\r\n");
