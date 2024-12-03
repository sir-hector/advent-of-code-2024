import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');

let result: number = 0;

splitted.forEach((value) => {
    const splittedValue = value.split(" ");
    if (isSafeReport(splittedValue)) {
        result++;
    } else {
        let isSafeAfterRemoval = false;
        for (let i = 0; i < splittedValue.length; i++) {
            const modifiedReport = splittedValue.slice(0, i).concat(splittedValue.slice(i + 1));
            if (isSafeReport(modifiedReport)) {
                isSafeAfterRemoval = true;
                break;
            }
        }

        if (isSafeAfterRemoval) {
            result++;
        }
    }
})

function isSafeReport(report: string[]): boolean {
    let isDecreasing = true;
    let isIncreasing = true;

    // Check decreasing
    for (let i = 1; i < report.length; i++) {
        const diff = parseInt(report[i - 1]) - parseInt(report[i]);
        if (diff < 1 || diff > 3) {
            isDecreasing = false;
        }
        if (parseInt(report[i - 1]) <= parseInt(report[i])) {
            isDecreasing = false;
        }
    }

    // Check increasing
    for (let i = 1; i < report.length; i++) {
        const diff = parseInt(report[i]) - parseInt(report[i - 1]);
        if (diff < 1 || diff > 3) {
            isIncreasing = false;
        }
        if (parseInt(report[i]) <= parseInt(report[i - 1])) {
            isIncreasing = false;
        }
    }

    return isDecreasing || isIncreasing;
}

console.log(result)