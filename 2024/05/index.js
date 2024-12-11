// @ts-check
import fs from "node:fs/promises";

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47

const rules = Array.from(input.matchAll(/\d\d\|\d\d/g))
    .map(x => x[0])

if (!rules) throw new Error("failed to parse rules")

// console.log(rules.slice(0,10))
// console.log(rules.slice(rules.length - 10, rules.length))

const updates = Array.from(input.matchAll(/\d\d,(\d\d,?)+/g))
    .map(x => x[0])

if (!updates) throw new Error("failed to parse updates")

// console.log(updates?.slice(0,10))
// console.log(updates?.slice(updates.length-10,updates.length))



