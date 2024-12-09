import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n\n');

const rules = splitted[0].split('\n');
const sequences = splitted[1].split('\n');

// prapare full map
const rullesMap = {};
rules.map((rule) => {
    const ruleSplitted = rule.split('|')
    if (rullesMap[ruleSplitted[0]]) {
        rullesMap[ruleSplitted[0]].push(ruleSplitted[1])
    } else {
        rullesMap[ruleSplitted[0]] = [ruleSplitted[1]]
    }
})
let sum = 0;
let sum2 = 0;
// iterate through updates
sequences.forEach((sequence) => {
    const sequenceItems = sequence.split(',');
    let condition = true;

    sequenceItems.some((value, index) => {
        // get values from mapper.
        const values = rullesMap[value] ? rullesMap[value] : []
        // get rest of string -- only right
        const restOfValues = sequenceItems.slice(index + 1, sequenceItems.length)
        // check if rest has all required values -- only right
        restOfValues.some(value => {
            if (values.includes(value)) {
                condition = true;
            } else {
                condition = false;
                return true;
            }
        })

        return !condition
    })

    if (condition) {
        sum += parseInt((sequenceItems[Math.floor(sequenceItems.length / 2)]))
    } else {
        console.log("part2")
    }
})
console.log(sum)
console.log(sum2)