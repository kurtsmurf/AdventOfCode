// @ts-check
import fs from "node:fs/promises";

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

const matrix = input.split("\n").map((row) => row.split(""));

// part 1
{
  /**
   *
   * @param {[number,number]} param0
   * @param {(1|-1)[]} dir
   */
  const diagonal = ([x, y], [dx, dy]) => {
    let line = "";

    while (matrix[y]?.[x] !== undefined) {
      line += matrix[y][x];
      y += dy;
      x += dx;
    }

    return line;
  };

  const diagonals = [diagonal([0, 0], [1, 1]), diagonal([139, 0], [-1, 1])];
  for (let i = 1; i < 140; i++) {
    diagonals.push(diagonal([i, 0], [1, 1]));
    diagonals.push(diagonal([0, i], [1, 1]));
    diagonals.push(diagonal([139 - i, 0], [-1, 1]));
    diagonals.push(diagonal([139, i], [-1, 1]));
  }

  const lines = [
    // horizontals
    ...matrix.map((row) => row.join("")),
    // verticals
    ...matrix[0].map((_, col) => matrix.map((row) => row[col]).join("")),
    ...diagonals,
  ];

  /**
   *
   * @param {string} line
   * @returns
   */
  const test = (line) => {
    const forward = [...line.matchAll(/XMAS/g)].length;
    const backward = [...line.split("").reverse().join("").matchAll(/XMAS/g)]
      .length;

    return forward + backward;
  };

  const sum = lines.map(test).reduce((a, b) => a + b, 0);

  console.log("Part 1", sum);
}

// part 2
{
  /**
   *
   * @param {string} line
   * @returns {boolean}
   */
  const matches = (line) => ["SAM", "MAS"].includes(line);

  /**
   *
   * @param {[number, number]} param0
   * @returns {boolean}
   */
  const test = ([x, y]) => {
    const char = matrix[y][x];

    if (char !== "A") return false;

    const diagL = matrix[y - 1]?.[x - 1] + char + matrix[y + 1]?.[x + 1];

    const diagR = matrix[y - 1]?.[x + 1] + char + matrix[y + 1]?.[x - 1];

    return matches(diagL) && matches(diagR);
  };

  let sum = 0;
  for (const [y, line] of matrix.entries()) {
    for (const [x, char] of line.entries()) {
      if (test([x, y])) sum++;
    }
  }

  console.log("Part 2:", sum);
}
