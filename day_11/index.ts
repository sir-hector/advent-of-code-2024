import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8').trim();
let splitted = data.split(' ').map(Number);
const ITERATIONS = 75;


// part 1
// for (let i = 1; i <= ITERATIONS; i++) {
//     let result: number[] = [];
//     splitted.forEach(value => {
//         if (value === 0) {
//             result.push(1);
//         } else if (value.toString().split('').length % 2 === 0) {
//             const numString = value.toString();
//             const mid = numString.length / 2;
//             const part1 = numString.slice(0, mid)
//             const part2 = numString.slice(mid);

//             result.push(parseInt(part1));
//             result.push(parseInt(part2));
//         } else {
//             result.push(value * 2024);
//         }
//     })
//     splitted = [...result]
// }

// // console.log(splitted)
// console.log(splitted.length)

// part 2

let stoneCounts = new Map<number, number>();

// Initialize stone counts from the input data
data.split(' ').map(Number).forEach(num => {
    stoneCounts.set(num, (stoneCounts.get(num) || 0) + 1);
});

for (let i = 1; i <= ITERATIONS; i++) {
    let newStoneCounts = new Map<number, number>();

    Array.from(stoneCounts.entries()).forEach(([stone, count]) => {
        if (stone === 0) {
            // Rule 1: 0 becomes 1
            newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count);
        } else if (stone.toString().length % 2 === 0) {
            // Rule 2: Split even-length numbers
            const numString = stone.toString();
            const mid = numString.length / 2;
            const part1 = parseInt(numString.slice(0, mid), 10);
            const part2 = parseInt(numString.slice(mid), 10);

            newStoneCounts.set(part1, (newStoneCounts.get(part1) || 0) + count);
            newStoneCounts.set(part2, (newStoneCounts.get(part2) || 0) + count);
        } else {
            // Rule 3: Multiply by 2024
            const newStone = stone * 2024;
            newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
        }
    });

    // Update the stone counts for the next iteration
    stoneCounts = newStoneCounts;
}

// Calculate the total number of stones
let totalStones = 0;
stoneCounts.forEach(count => {
    totalStones += count;
});

console.log(totalStones);
