import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');
let sum1 = 0;

splitted.forEach((value) => {
    const splitValue = value.split(":")
    const result = parseInt(splitValue[0])
    const items = splitValue[1].split(" ");
    items.shift();


    const combinations = generatePossibleOperationPart2(items.length - 1);
    console.log(combinations)
    combinations.some((operators) => {
        let currentResult = parseInt(items[0]);
        for (let i = 0; i < operators.length; i++) {
            const nextNumber = items[i + 1];
            if (operators[i] === '+') {
                currentResult += parseInt(nextNumber);
            } else if (operators[i] === '*') {
                currentResult *= parseInt(nextNumber);
            } else if (operators[i] === '/') {
                currentResult = parseInt(`${currentResult}${nextNumber}`);
            }
        }

        if (currentResult === result) {
            sum1 += result;
            return true;
        }
    });
})

// generate possible operators

function generatePossibleOperation(length: number) {
    const combinations: string[] = [];

    const totalCombination = 1 << length;

    for (let i = 0; i < totalCombination; i++) {
        let currentCombination = ''
        for (let bit = 0; bit < length; bit++) {
            // check if in number i at current possition (bit) is 1 or 0
            currentCombination += (i & (1 << bit)) ? '*' : '+';
        }
        combinations.push(currentCombination);
    }

    return combinations;
}

// part 2 

function generatePossibleOperationPart2(length: number) {
    const combinations: string[] = [];

    const totalCombination = Math.pow(3, length)

    for (let i = 0; i < totalCombination; i++) {
        let currentCombination = ''
        let n = i;
        for (let bit = 0; bit < length; bit++) {
            const operatorType = n % 3;
            currentCombination += operatorType === 0 ? '+' : operatorType === 1 ? '*' : '/';
            n = Math.floor(n / 3);
        }
        combinations.push(currentCombination);
    }

    return combinations;
}

console.log(sum1)