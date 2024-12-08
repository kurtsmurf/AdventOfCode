import fs from "node:fs/promises";

const input = await fs.readFile("input", "utf8");

// part 1
{
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

  let sum = 0;
  for (const match of matches) {
    sum += match[1] * match[2];
  }

  console.log("Part 1:", sum);
}

// part 2
{
  const matches = input.matchAll(
    /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g,
  );

  let active = true;
  let sum = 0;
  for (const match of matches) {
    if (match[0] === "do()") {
      active = true;
      continue;
    };
    if (match[0] === "don't()") active = false;
    if (!active) continue;
    sum += match[1] * match[2];
  }

  console.log("Part 2:", sum);
}
