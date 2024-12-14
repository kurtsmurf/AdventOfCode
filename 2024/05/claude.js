// ============== PROMPT ==============

{// I'm doing Advent Of Code 2025 day 5 part 2 and I am stuck. Here's the prompt from Day 5:

// ```
// --- Day 5: Print Queue ---
// Satisfied with their search on Ceres, the squadron of scholars suggests subsequently scanning the stationery stacks of sub-basement 17.

// The North Pole printing department is busier than ever this close to Christmas, and while The Historians continue their search of this historically significant facility, an Elf operating a very familiar printer beckons you over.

// The Elf must recognize you, because they waste no time explaining that the new sleigh launch safety manual updates won't print correctly. Failure to update the safety manuals would be dire indeed, so you offer your services.

// Safety protocols clearly indicate that new pages for the safety manuals must be printed in a very specific order. The notation X|Y means that if both page number X and page number Y are to be produced as part of an update, page number X must be printed at some point before page number Y.

// The Elf has for you both the page ordering rules and the pages to produce in each update (your puzzle input), but can't figure out whether each update has the pages in the right order.

// For example:

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
// The first section specifies the page ordering rules, one per line. The first rule, 47|53, means that if an update includes both page number 47 and page number 53, then page number 47 must be printed at some point before page number 53. (47 doesn't necessarily need to be immediately before 53; other pages are allowed to be between them.)

// The second section specifies the page numbers of each update. Because most safety manuals are different, the pages needed in the updates are different too. The first update, 75,47,61,53,29, means that the update consists of page numbers 75, 47, 61, 53, and 29.

// To get the printers going as soon as possible, start by identifying which updates are already in the right order.

// In the above example, the first update (75,47,61,53,29) is in the right order:

// 75 is correctly first because there are rules that put each other page after it: 75|47, 75|61, 75|53, and 75|29.
// 47 is correctly second because 75 must be before it (75|47) and every other page must be after it according to 47|61, 47|53, and 47|29.
// 61 is correctly in the middle because 75 and 47 are before it (75|61 and 47|61) and 53 and 29 are after it (61|53 and 61|29).
// 53 is correctly fourth because it is before page number 29 (53|29).
// 29 is the only page left and so is correctly last.
// Because the first update does not include some page numbers, the ordering rules involving those missing page numbers are ignored.

// The second and third updates are also in the correct order according to the rules. Like the first update, they also do not include every page number, and so only some of the ordering rules apply - within each update, the ordering rules that involve missing page numbers are not used.

// The fourth update, 75,97,47,61,53, is not in the correct order: it would print 75 before 97, which violates the rule 97|75.

// The fifth update, 61,13,29, is also not in the correct order, since it breaks the rule 29|13.

// The last update, 97,13,75,29,47, is not in the correct order due to breaking several rules.

// For some reason, the Elves also need to know the middle page number of each update being printed. Because you are currently only printing the correctly-ordered updates, you will need to find the middle page number of each correctly-ordered update. In the above example, the correctly-ordered updates are:

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// These have middle page numbers of 61, 53, and 29 respectively. Adding these page numbers together gives 143.

// Of course, you'll need to be careful: the actual list of page ordering rules is bigger and more complicated than the above example.

// Determine which updates are already in the correct order. What do you get if you add up the middle page number from those correctly-ordered updates?

// Your puzzle answer was 5509.

// The first half of this puzzle is complete! It provides one gold star: *

// --- Part Two ---
// While the Elves get to work printing the correctly-ordered updates, you have a little time to fix the rest of them.

// For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order. For the above example, here are the three incorrectly-ordered updates and their correct orderings:

// 75,97,47,61,53 becomes 97,75,47,61,53.
// 61,13,29 becomes 61,29,13.
// 97,13,75,29,47 becomes 97,75,47,29,13.
// After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 47, 29, and 47. Adding these together produces 123.

// Find the updates which are not in the correct order. What do you get if you add up the middle page numbers after correctly ordering just those updates?
// ```

// I was able to solve Part 1, but Part 2 has me stumped. Take a look at my solution and let me know what I got wrong, and how to fix it.

// My Solution:
// ```
// // @ts-check
// import fs from "node:fs/promises";

// const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

// const parseInput = str => {
//     const rules = Array.from(input.matchAll(/\d\d\|\d\d/g))
//         .map(x => x[0])

//     if (!rules) throw new Error("failed to parse rules")

//     const updates = Array.from(input.matchAll(/\d\d,(\d\d,?)+/g))
//         .map(x => x[0])
//         .map(x => x.split(","))

//     if (!updates) throw new Error("failed to parse updates")

//     return { rules, updates };
// }

// const { rules, updates } = parseInput(input);

// /**
//  * 
//  * @param {string} rule 
//  * @param {string[]} update 
//  * @returns {boolean}
//  */
// const test = (rule, update) => {
//     const [LL, RR] = rule.split("|")

//     // rule followed if neither pageNum is in the update
//     if (!update.includes(LL) || !update.includes(RR)) return true

//     // find first instance of RR
//     const index = update.indexOf(RR)

//     // split array at that index
//     const after = update.slice(index + 1);

//     // rule followed if after part doesn't have LL
//     return !after.includes(LL);
// }

// const results = updates
//     .map(update => {
//         const violations = rules.filter(rule => !test(rule, update));
//         const middleLetter = update[Math.floor(update.length / 2)];
//         return { update, violations, middleLetter }
//     })

// // part 1
// {
//     const succeeded = results.filter((result) => result.violations.length === 0)

//     let sum = 0;
//     for (const { middleLetter } of succeeded) {
//         sum += parseInt(middleLetter);
//     }

//     console.log("Part 1:", sum)
// }

// // part 2
// {
//     const failed = results.filter((result) => result.violations.length !== 0);

//     const move = (arr, i1, i2) => {
//         const item = arr.splice(i1, 1)[0]
//         arr.splice(i2, 0, item)
//         return arr    
//     }

//     const sum = results
//         .map(result => {
//             const pertinent_rules = rules.filter(rule => {
//                 const [l, r] = rule.split("|")
//                 return result.update.includes(l) && result.update.includes(r)
//             })
        
//             const dictionary = pertinent_rules
//                 .map(rule => rule.split("|"))
//                 .reduce((acc, [l,r]) => {
//                     const current = acc.get(l) || []
//                     acc.set(l, [...current, r])
//                     return acc
//                 },
//                 new Map())
    
//             // for each key of dictionary
//             // find first item index (pivot) in update where dictionary[key].includes(item)
//             // find key in update and move to pivot index
//             const transformed = [...dictionary.entries()].reduce((update, [key, value]) => {
//                 const key_i = update.indexOf(key)
//                 const pivot = update.findIndex(item => value.includes(item))
    
//                 if (pivot > key_i ) return update
    
//                 const transformed = move(update, key_i, pivot)
//                 return transformed
//             }, result.update)

//             return transformed
//         })
//         .map(transformed => transformed[Math.floor(transformed.length / 2)])
//         .map(middleNum => parseInt(middleNum))
//         .reduce((a,b) => a+b, 0)

//     console.log("Part 2:", sum)
// }

// ```

}
// ============== RESPONSE ==============

{// Let me analyze your solution for Part 2 and help you identify the issues.

// The main problem with your current approach is in the logic for correcting the order of updates. The current implementation doesn't fully solve the constraint satisfaction problem presented in the problem statement. 

// Here's a more robust approach to solving Part 2:



// ```typescript
// import fs from "node:fs/promises";

// const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

// const parseInput = (str: string) => {
//     const rules = Array.from(str.matchAll(/(\d+)\|(\d+)/g))
//         .map(match => ({ before: match[1], after: match[2] }));

//     const updates = Array.from(str.matchAll(/(\d+(?:,\d+)*)/g))
//         .map(match => match[1].split(","));

//     return { rules, updates };
// }

// const topologicalSort = (pages: string[], rules: Array<{before: string, after: string}>) => {
//     // Create a directed graph representing the rules
//     const graph = new Map<string, Set<string>>();
//     const inDegree = new Map<string, number>();

//     // Initialize graph and in-degree
//     pages.forEach(page => {
//         graph.set(page, new Set());
//         inDegree.set(page, 0);
//     });

//     // Populate graph with rules that apply to the current update
//     rules.forEach(rule => {
//         if (pages.includes(rule.before) && pages.includes(rule.after)) {
//             if (!graph.get(rule.before)!.has(rule.after)) {
//                 graph.get(rule.before)!.add(rule.after);
//                 inDegree.set(rule.after, (inDegree.get(rule.after) || 0) + 1);
//             }
//         }
//     });

//     // Kahn's algorithm for topological sorting
//     const queue = pages.filter(page => (inDegree.get(page) || 0) === 0);
//     const sorted: string[] = [];

//     while (queue.length > 0) {
//         const current = queue.shift()!;
//         sorted.push(current);

//         graph.get(current)?.forEach(neighbor => {
//             inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
//             if (inDegree.get(neighbor) === 0) {
//                 queue.push(neighbor);
//             }
//         });
//     }

//     // If not all pages are sorted, there's a cycle or impossible ordering
//     return sorted.length === pages.length ? sorted : null;
// }

// const { rules, updates } = parseInput(input);

// // Part 2 solution
// const part2 = () => {
//     const incorrectUpdates = updates.filter(update => {
//         // Check if the update is already in the correct order
//         const sorted = topologicalSort(update, rules);
//         return sorted === null || !sorted.every((page, index) => page === update[index]);
//     });

//     const middleNumbers = incorrectUpdates.map(update => {
//         const sorted = topologicalSort(update, rules);
//         if (!sorted) return 0; // Fallback for impossible orderings
//         return parseInt(sorted[Math.floor(sorted.length / 2)]);
//     });

//     return middleNumbers.reduce((a, b) => a + b, 0);
// }

// console.log("Part 2:", part2());

// ```

// Key differences from your original solution:

// 1. **Topological Sorting**: I've implemented a proper topological sorting algorithm (Kahn's algorithm) that can handle complex ordering constraints.

// 2. **Rule Application**: The solution only considers rules that apply to pages present in the current update.

// 3. **Constraint Checking**: Instead of trying to move elements incrementally, the algorithm finds a completely valid ordering that satisfies all constraints.

// 4. **Handling Impossible Orderings**: The code handles cases where no valid ordering exists by returning `null`.

// The main challenges in the original solution were:
// - The incremental moving of elements didn't guarantee a correct global ordering
// - The approach didn't fully capture the constraint satisfaction problem
// - The rule application was too simplistic

// The new solution uses a graph-based approach to determine the correct ordering:
// - Create a directed graph based on the rules
// - Use topological sorting to find a valid ordering
// - Check if the current update matches the sorted order
// - For incorrectly ordered updates, find the correct ordering
// - Calculate the middle number of the corrected updates

// This approach should correctly solve Part 2 by finding the middle page numbers of updates that are not initially in the correct order.

// Would you like me to explain the algorithm in more detail or help you understand any specific part of the solution?
}

// original output was ts - asked for js output instead:

// @ts-check
import fs from "node:fs/promises";

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

const parseInput = (str) => {
    const rules = Array.from(str.matchAll(/(\d+)\|(\d+)/g))
        .map(match => ({ before: match[1], after: match[2] }));

    const updates = Array.from(str.matchAll(/(\d+(?:,\d+)*)/g))
        .map(match => match[1].split(","));

    return { rules, updates };
}

const topologicalSort = (pages, rules) => {
    // Create a directed graph representing the rules
    const graph = new Map();
    const inDegree = new Map();

    // Initialize graph and in-degree
    pages.forEach(page => {
        graph.set(page, new Set());
        inDegree.set(page, 0);
    });

    // Populate graph with rules that apply to the current update
    rules.forEach(rule => {
        if (pages.includes(rule.before) && pages.includes(rule.after)) {
            if (!graph.get(rule.before).has(rule.after)) {
                graph.get(rule.before).add(rule.after);
                inDegree.set(rule.after, (inDegree.get(rule.after) || 0) + 1);
            }
        }
    });

    // Kahn's algorithm for topological sorting
    const queue = pages.filter(page => (inDegree.get(page) || 0) === 0);
    const sorted = [];

    while (queue.length > 0) {
        const current = queue.shift();
        sorted.push(current);

        graph.get(current).forEach(neighbor => {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        });
    }

    // If not all pages are sorted, there's a cycle or impossible ordering
    return sorted.length === pages.length ? sorted : null;
}

const { rules, updates } = parseInput(input);

// Part 2 solution
const part2 = () => {
    const incorrectUpdates = updates.filter(update => {
        // Check if the update is already in the correct order
        const sorted = topologicalSort(update, rules);
        return sorted === null || !sorted.every((page, index) => page === update[index]);
    });

    const middleNumbers = incorrectUpdates.map(update => {
        const sorted = topologicalSort(update, rules);
        if (!sorted) return 0; // Fallback for impossible orderings
        return parseInt(sorted[Math.floor(sorted.length / 2)]);
    });

    return middleNumbers.reduce((a, b) => a + b, 0);
}

console.log("Part 2:", part2()); // 4407