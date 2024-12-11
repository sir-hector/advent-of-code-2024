import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');

const rowsNumber = splitted.length;
const columnsNumber = splitted[0].length;

let cursorXPosition = 0;
let cursorYPosition = 0;

// base direction(up)
let dx: number = 0;
let dy: number = -1;

const CURSOR_SYMBOL = '^'
const OBSTRUCTION_SYMBOL = '#'

splitted.some((value, rowIndex) => {
    let found = false;
    value.split('').some((value, index) => {
        if (value === CURSOR_SYMBOL) {
            cursorYPosition = rowIndex;
            cursorXPosition = index;
            found = true;
            return found;
        }
    })
    return found;
});


let found = true;
const visitedPositions = new Set();
while (found) {
    if (cursorXPosition >= columnsNumber || cursorXPosition < 0 || cursorYPosition >= rowsNumber || cursorYPosition < 0) {
        found = false;
        break;
    }
    console.log(splitted[cursorXPosition][cursorYPosition])
    if (splitted[cursorYPosition][cursorXPosition] === OBSTRUCTION_SYMBOL) {
        cursorXPosition -= dx;
        cursorYPosition -= dy;
        const [newDx, newDy]: [number, number] = turnRight(dx, dy);
        dx = newDx;
        dy = newDy;
    } else {
        visitedPositions.add(`${cursorXPosition},${cursorYPosition}`);
        cursorXPosition += dx;
        cursorYPosition += dy;
    }
}

console.log(visitedPositions.size)
// direction dx, dy
function turnRight(dx: number, dy: number): [number, number] {
    return [-dy, dx];
}