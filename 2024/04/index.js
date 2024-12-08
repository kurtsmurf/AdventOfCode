// @ts-check
import fs from "node:fs/promises";

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

const matrix = input.split("\n").map((row) => row.split(""));

/**
 *
 * @param {[number,number]} param0
 * @param {1|-1} dir
 */
const diagonal = ([x, y], dir) => {
  let line = "";

  while (matrix[y]?.[x] !== undefined) {
    line += matrix[y][x];
    y += dir;
    x += dir;
  }

  return line;
};

/**
 * 
 * @param {string} line 
 * @returns 
 */
const test = (line) => {
  const forward = [...line.matchAll(/XMAS/g)].length;
  const backward = [...line.split("").reverse().join("").matchAll(/XMAS/g)].length;
  return forward + backward;
};

const lines = [
  // horizontals
  ...matrix.map((row) => row.join("")),
  // verticals
  ...matrix[0].map((_, col) => matrix.map((row) => row[col]).join("")),
  // diagonal down right
  // starting from left wall
  ...matrix.map((_, i) => diagonal([0, i], 1)),
  // starting from top
  ...[...new Array(matrix[0].length - 1)].map((v, i) =>
    diagonal([i + 1, 0], 1),
  ),
  // diagonal down left
  // starting from right wall
  ...matrix.map((_, i) => diagonal([matrix[0].length - 1, i], -1)),
  // starting from top
  ...[...new Array(matrix[0].length - 1)].map((v, i) => diagonal([i, 0], -1)),
];

const sum = lines.map(test).reduce((a,b) => a + b, 0);

console.log("Part 1", sum)