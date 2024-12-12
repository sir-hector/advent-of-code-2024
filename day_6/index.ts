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
const visitedPositions = new Set<String>();
while (found) {
    if (cursorXPosition >= columnsNumber || cursorXPosition < 0 || cursorYPosition >= rowsNumber || cursorYPosition < 0) {
        found = false;
        break;
    }
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



// part 2

// reset cursor position
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


let loopCausingPositions = 0;

visitedPositions.forEach((position) => {
    const [obstructionX, obstructionY] = position.split(',').map(Number);

    if (obstructionX === cursorXPosition && obstructionY === cursorYPosition) {
        return;
    }
    if (causesLoop(obstructionX, obstructionY)) {
        loopCausingPositions++;
    }
});

console.log(loopCausingPositions);

function causesLoop(obstructionX: number, obstructionY: number): boolean {
    let guardX = cursorXPosition;
    let guardY = cursorYPosition;
    let dirX = 0;
    let dirY = -1;

    const seenStates = new Set<string>();

    while (true) {
        if (guardX >= columnsNumber || guardX < 0 || guardY >= rowsNumber || guardY < 0) {
            return false;
        }
        if (
            (guardX === obstructionX && guardY === obstructionY) ||
            splitted[guardY][guardX] === OBSTRUCTION_SYMBOL
        ) {
            guardX -= dirX;
            guardY -= dirY;
            [dirX, dirY] = turnRight(dirX, dirY);
        } else {
            const state = `${guardX},${guardY},${dirX},${dirY}`;
            if (seenStates.has(state)) {
                return true;
            }
            seenStates.add(state);
            guardX += dirX;
            guardY += dirY;
        }
    }
}