import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const regex = /mul\((\d+),(\d+)\)/g;
const matches = data.match(regex);

let sum = 0;

// part 1

matches?.forEach(entry => {
    sum += calculateSumFromText(entry)
});
//part2

const pattern2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const instructions2 = data.match(pattern2);

let isEnabled = true;
let sum2 = instructions2?.reduce((acc, instruction) => {
    console.log(instruction)
    if (instruction === "do()") {
        console.log("HERE2")
        isEnabled = true
    } else if (instruction === "don't()") {
        console.log("HERE")
        isEnabled = false
    } else if (isEnabled) {
        acc += calculateSumFromText(instruction)
    }
    return acc;

}, 0);

console.log(sum)
console.log(sum2)

function calculateSumFromText(value: String): number {
    const match = value.match(/\d+/g);
    if (match && match.length === 2) {
        return parseInt(match[0]) * parseInt(match[1]);
    } else {
        console.log("not found")
        return 0;
    }
}

