import fs from "node:fs/promises"

const input = await fs.readFile(import.meta.dirname + "/input", "utf8");

const reports = input.trim().split("\n");

let numSafe = 0;

for (const report of reports) {
	const levels = report.trim().split(" ");
	
	if (
		strictlyAscendingOrDescending(levels)
		&& maxGap(levels, 3) 
	) {
		numSafe += 1;
	}
}

console.log(numSafe);

function maxGap(levels, max) {
	for (let i = 0; i < levels.length - 1; i++) {
		if (Math.abs(levels[i] - levels[i + 1]) > max) return false;
	}
	return true;
}

function strictlyAscendingOrDescending(levels) {
	if (levels.length <= 1) return true;
	const reportSign = Math.sign(levels[0] - levels[1]);
	if (reportSign === 0) return false;
	for (let i = 1; i < levels.length - 1; i++) {
		const levelSign = Math.sign(levels[i] - levels[i + 1]);
		if (levelSign !== reportSign) return false;
	}
	return true;
}
