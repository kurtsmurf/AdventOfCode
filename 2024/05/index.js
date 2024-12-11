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

const updates = Array.from(input.matchAll(/\d\d,(\d\d,?)+/g))
    .map(x => x[0])
    .map(x => x.split(","))

if (!updates) throw new Error("failed to parse updates")

/**
 * 
 * @param {string} rule 
 * @param {string[]} update 
 * @returns {boolean}
 */
const test = (rule, update) => {
    const [LL,RR] = rule.split("|")

    // rule followed if neither pageNum is in the update
    if (!update.includes(LL) || !update.includes(RR)) return true

    // find first instance of RR
    const index = update.indexOf(RR)

    // split array at that index
    const after = update.slice(index + 1);

    // rule followed if after part doesn't have LL
    return !after.includes(LL);

}


// part 1
{
    const results = updates
        .map(update => {
            const violation = rules.find(rule => !test(rule, update))
            const middleLetter = update[Math.floor(update.length / 2)];
            return { update, violation, middleLetter }
        })

    const failed = results.filter((result) => result.violation);

    console.log("num failed:", failed.length)
    console.log("total:", results.length)
    
    let sum = 0;
    for (const {middleLetter} of failed) {
        sum += parseInt(middleLetter)
    }

    console.log("Part 1:", sum)
}

