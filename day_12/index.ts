import { readFileSync } from 'fs';
interface AREA {
    area: number;
    perimeter: number;
}

const data = readFileSync('./data.txt', 'utf-8').trim();
const splitted = data.split('\n');
let result = 0;
const rowsNumber = splitted.length;
const columnsNumber = splitted[0].length;

const ALPHABET: string[] = [];


// define all possible characters
splitted.forEach(value => {
    for (const c of value) {
        if (!ALPHABET.includes(c)) {
            ALPHABET.push(c)
        }
    }
})

//flood - fill algoritmh
function floodFill(x: number, y: number, letter: string, visited: Set<string>): AREA {
    const stack: [number, number][] = [[x, y]];
    let area = 0;
    let perimeter = 0;

    while (stack.length > 0) {
        const [cx, cy] = stack.pop()!;
        console.log(cx, cy)
        const key = `${cx},${cy}`;

        if (visited.has(key)) continue;
        visited.add(key);
        area++;

        const directions = [
            [0, -1],  // Up
            [0, 1],   // Down
            [-1, 0],  // Left
            [1, 0]    // Right
        ];

        for (const [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx < 0 || ny < 0 || nx >= columnsNumber || ny >= rowsNumber) {
                perimeter++; // External border
            } else if (splitted[ny][nx] !== letter) {
                perimeter++; // Border with a different letter
            } else if (!visited.has(`${nx},${ny}`)) {
                stack.push([nx, ny]); // Add connected cell to the stack
            }
        }
    }

    return { area, perimeter }
}

ALPHABET.forEach(letter => {
    const areas: AREA[] = [];
    const visited = new Set<string>();
    // process all data
    splitted.forEach((value, yIndex) => {
        value.split('').forEach((item, xIndex) => {
            // process if it is current letter from alphabet
            if (splitted[yIndex][xIndex] === letter && !visited.has(`${xIndex},${yIndex}`)) {
                const { area, perimeter } = floodFill(xIndex, yIndex, letter, visited);
                console.log(`${letter}: area = ${area}, perimeter = ${perimeter}`);
                result += area * perimeter;
            }
        })
    })


})
console.log(`Total result: ${result}`);