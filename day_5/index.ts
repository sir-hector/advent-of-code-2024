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
    const condition = isSorted(sequence)

    if (condition) {
        sum += parseInt((sequenceItems[Math.floor(sequenceItems.length / 2)]))
    } else {
        // PART 2 prepare mapping that has only values from sequence items
        const dictionary = {};
        const ordered: string[] = [];

        sequenceItems.forEach(value => {
            dictionary[value] = rules.filter((rule) => rule[0] === value).map(rule => rule[1]).filter(rule => sequenceItems.includes(rule))
        })

        while (Object.keys(dictionary).length) {
            // find the key with empty array
            const emptyKey = Object.keys(dictionary).find((key) => dictionary[key].length === 0);

            //remove the key from all values
            for (const key in dictionary) {
                dictionary[key] = dictionary[key].filter(item => item !== emptyKey)
            }

            if (emptyKey) {
                delete dictionary[emptyKey];
                ordered.unshift(emptyKey)
            }
        }
        console.log(ordered)
        console.log((ordered[Math.floor(ordered.length / 2)]))
        sum2 += parseInt((ordered[Math.floor(ordered.length / 2)]))

    }
})
console.log(sum)
console.log(sum2)

function isSorted(sequence: string) {
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
    return condition;
}