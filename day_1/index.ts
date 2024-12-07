import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');

// result
let sum: number = 0;

const leftPart: number[] = []
const rightPart: number[] = []

splitted.forEach((row) => {
    // split row
    const splittedRow = row.split('   ');
    // left part
    leftPart.push(parseInt(splittedRow[0]));
    rightPart.push(parseInt(splittedRow[1]));
})

// sort arrays
leftPart.sort((a, b) => {
    return a - b;
})

rightPart.sort((a, b) => {
    return a - b;
})

// calculate difference
leftPart.forEach((value, index) => {
    const difference = Math.abs(value - rightPart[index]);
    sum = sum + difference;
})

// part 2

let part2 = 0;

const rightOccurences = rightPart.reduce((acc, value) => {
    if (acc[value]) {
        acc[value] += 1;
    } else {
        acc[value] = 1;
    }
    return acc;
}, {});

leftPart.forEach((value) => {
    if (rightOccurences[value]) {
        part2 += value * rightOccurences[value]
    }
})


console.log(sum)
console.log(part2)