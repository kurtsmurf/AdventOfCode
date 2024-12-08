// @ts-check

import fs from "node:fs/promises";

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

// https://github.com/codylandry/advent_of_code_2024/blob/main/lib/days/day_3/part_2.ex

// alias AdventOfCode2024.Day3

// @disabled_regex ~r/don't\(\).*?(?:do\(\)|$)/s

// @doc """
// Remove disabled instructions from the input by replacing sections after don't() with an empty string.
// """
// def remove_disabled_instructions(input) do
//   input
//   |> String.replace(@disabled_regex, "")
// end

// def solve do
//   Day3.input_file()
//   |> remove_disabled_instructions()
//   |> Day3.get_mul_instructions()
//   |> Enum.map(&Day3.get_mul_instruction_product/1)
//   |> Enum.sum()
// end

const disabled_regex = /don't\(\).*?(do\(\))?/g;
const mul_instruction_regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = input
  .replaceAll(disabled_regex, "")
  .matchAll(mul_instruction_regex);

let sum = 0;
for (const match of matches) {
  sum += Number.parseInt(match[1]) * Number.parseInt(match[2]);
}

console.log("Part 2:", sum);
