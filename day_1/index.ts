import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');

// result
let sum: number = 0;

let leftPart: number[] = []
let rightPart: number[] = []

splitted.forEach((row) => {
    // split row
    const splittedRow = row.split('   ');
    // left part
    leftPart.push(parseInt(splittedRow[0]))
    rightPart.push(parseInt(splittedRow[1]))
})

// sort arrays
leftPart.sort((a, b) => {
    return a - b
})

rightPart.sort((a, b) => {
    return a - b
})

// calculate difference
leftPart.forEach((value, index) => {
    const difference = Math.abs(value - rightPart[index])
    console.log(difference)
    sum = sum + difference;
})

console.log(sum)