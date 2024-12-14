// @ts-check
import fs from "node:fs/promises";

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

const test_input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

// 75,97,47,61,53 becomes 97,75,47,61,53.
// 61,13,29 becomes 61,29,13.
// 97,13,75,29,47 becomes 97,75,47,29,13.


const parseInput = str => {
    const rules = Array.from(input.matchAll(/\d\d\|\d\d/g))
        .map(x => x[0])

    if (!rules) throw new Error("failed to parse rules")

    const updates = Array.from(input.matchAll(/\d\d,(\d\d,?)+/g))
        .map(x => x[0])
        .map(x => x.split(","))

    if (!updates) throw new Error("failed to parse updates")

    return { rules, updates };
}

const { rules, updates } = parseInput(input);

/**
 * 
 * @param {string} rule 
 * @param {string[]} update 
 * @returns {boolean}
 */
const test = (rule, update) => {
    const [LL, RR] = rule.split("|")

    // rule followed if neither pageNum is in the update
    if (!update.includes(LL) || !update.includes(RR)) return true

    // find first instance of RR
    const index = update.indexOf(RR)

    // split array at that index
    const after = update.slice(index + 1);

    // rule followed if after part doesn't have LL
    return !after.includes(LL);
}

const results = updates
    .map(update => {
        const violations = rules.filter(rule => !test(rule, update));
        const middleLetter = update[Math.floor(update.length / 2)];
        return { update, violations, middleLetter }
    })

// part 1
{
    const succeeded = results.filter((result) => result.violations.length === 0)

    let sum = 0;
    for (const { middleLetter } of succeeded) {
        sum += parseInt(middleLetter);
    }

    console.log("Part 1:", sum)
}

// part 2
{
    const failed = results.filter((result) => result.violations.length !== 0);

    const move = (arr, i1, i2) => {
        const item = arr.splice(i1, 1)[0]
        arr.splice(i2, 0, item)
        return arr    
    }

    const sum = results
        .map(result => {
            const pertinent_rules = rules.filter(rule => {
                const [l, r] = rule.split("|")
                return result.update.includes(l) && result.update.includes(r)
            })
        
            const dictionary = pertinent_rules
                .map(rule => rule.split("|"))
                .reduce((acc, [l,r]) => {
                    const current = acc.get(l) || []
                    acc.set(l, [...current, r])
                    return acc
                },
                new Map())
    
            // for each key of dictionary
            // find first item index (pivot) in update where dictionary[key].includes(item)
            // find key in update and move to pivot index
            const transformed = [...dictionary.entries()].reduce((update, [key, value]) => {
                const key_i = update.indexOf(key)
                const pivot = update.findIndex(item => value.includes(item))
    
                if (pivot > key_i ) return update
    
                const transformed = move(update, key_i, pivot)
                return transformed
            }, result.update)

            return transformed
        })
        .map(transformed => transformed[Math.floor(transformed.length / 2)])
        .map(middleNum => parseInt(middleNum))
        .reduce((a,b) => a+b, 0)

    console.log("Part 2:", sum)
}
