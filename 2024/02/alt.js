// @ts-check
import fs from "node:fs/promises";

const input = await fs.readFile("input", "utf8");

// https://github.com/jelkand/aoc-2024/blob/main/lib/advent_of_code/day_02.ex

// defmodule AdventOfCode.Day02 do

//   def parse_line(line) do
//     line
//     |> String.split(" ", trim: true)
//     |> Enum.map(&String.to_integer/1)
//   end
const parse_line = (str) =>
  str
    .trim()
    .split(" ")
    .map((x) => Number.parseInt(x));

//   def parse_input(input) do
//     input
//     |> String.split("\n", trim: true)
//     |> Enum.map(&parse_line/1)
//   end
const parse_input = (str) => str.trim().split("\n").map(parse_line);

//   def compute_line(line) do
//     line
//     |> Enum.chunk_every(2, 1, :discard)
//     |> Enum.map(fn [a, b] -> b - a end)
//   end

// turn [1,2,3] into [[1,2],[2,3]]
const chunk = (arr) =>
  arr.reduce((acc, cur, curI, arr) => {
    const next = arr[curI + 1];
    return next === undefined ? acc : [...acc, [cur, next]];
  }, []);

// console.log(chunk([1, 2, 3]));
// console.log(chunk([1, 2, 3, 4]));

/**
 *
 * @param {number[]} line
 * @returns {number[]}
 */
const compute_diffs = (line) => chunk(line).map(([a, b]) => b - a);

//   def test_line(line) do
//     monotonic_increasing = Enum.all?(line, fn x -> x > 0 end)
//     monotonic_decreasing = Enum.all?(line, fn x -> x < 0 end)

//     within_bounds = Enum.all?(line, fn x -> abs(x) <= 3 end)

//     (monotonic_increasing or monotonic_decreasing) and within_bounds
//   end

/**
 * @param {number[]} diffs
 */
const test_diffs = (diffs) => {
  const monotonic_increasing = diffs.every((x) => x > 0);
  const monotonic_decreasing = diffs.every((x) => x < 0);
  const within_bounds = diffs.every((x) => Math.abs(x) <= 3);
  return (monotonic_increasing || monotonic_decreasing) && within_bounds;
};

const log_and_return = (x) => {
  console.log(x);
  return x;
};

const safe = (line) => test_diffs(compute_diffs(line));

//   def part1(args) do
//     args
//     |> parse_input()
//     |> Enum.map(&compute_line/1)
//     |> Enum.map(&test_line/1)
//     |> Enum.count(& &1)
//   end
const part1 = () => parse_input(input).map(safe).filter(Boolean).length;

console.log("Part 1:", part1());

//   def can_make_safe({line, _safety}) do
//     Enum.map(0..(length(line) - 1), fn idx ->
//       List.delete_at(line, idx)
//       |> compute_line()
//       |> test_line()
//     end)
//     # any true
//     |> Enum.any?(& &1)
//   end

const delete_at = (arr, i) => {
  const copy = [...arr];
  copy.splice(i, 1);
  return copy;
};

const can_make_safe = (line) =>
  [...new Array(line.length)]
    .map((_, i) => safe(delete_at(line, i)))
    .some((x) => x);

// console.log(can_make_safe([9,8,7,8,6,5,4]))

//   def part2(args) do
//     {safe, unsafe} =
//       args
//       |> parse_input()
//       |> Enum.map(fn line -> {line, compute_line(line) |> test_line} end)
//       |> Enum.split_with(fn {_line, safe} -> safe end)

//     can_make_safe = unsafe |> Enum.map(&can_make_safe/1) |> Enum.filter(& &1)

//     length(safe) + length(can_make_safe)
//   end

const part2 = () => {
  const lines = parse_input(input);
  const unsafe = lines.filter((line) => !safe(line));
  const made_safe = unsafe.filter(can_make_safe);
  return lines.length - unsafe.length + made_safe.length;
};

console.log("Part 2:", part2());

// end
