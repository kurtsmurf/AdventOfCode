import fs from "node:fs/promises"

const input = await fs.readFile("input", "utf8");

const tuples = input
	.trim()
	.split("\n")
	.map(row => row.split("   "));

const left = tuples.map(tuple => tuple[0]);

const right = tuples.map(tuple => tuple[1]);

const rightCounts = new Map();

for (const item of right) {
	rightCounts.set(item, (rightCounts.get(item) || 0) + 1);
}

const similarityScore = left
	.reduce((acc,cur) => acc + cur * (rightCounts.get(cur) || 0), 0);

console.log(similarityScore);


