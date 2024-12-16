import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');
const antennas = {};
const antinodes = new Set<String>()
const rowsNumber = splitted.length;
const columnsNumber = splitted[0].length;


// read antennas
splitted.forEach((value: string, indexY: number) => {
    // each 
    value.split('').forEach((antenna, indexX) => {
        if (antenna != '.') {
            if (!antennas[antenna]) {
                antennas[antenna] = [[indexX, indexY]]
            } else {
                antennas[antenna] = [...antennas[antenna], [indexX, indexY]]
            }
        }
    })
})

// check antinodes
Object.keys(antennas).forEach((antenna) => {
    // iterate through all positions 
    antennas[antenna].forEach((item, index) => {
        // generate all positions
        for (let i = index + 1; i < antennas[antenna].length; i++) {
            getPossibleAntinodes(item, antennas[antenna][i])
        }
    })
})

function calculateDistance(pointA: number[], pointB: number[]) {
    const dx = (pointA[0]) - (pointB[0]);
    const dy = (pointA[1]) - (pointB[1]);

    return [dx, dy];
}

function getPossibleAntinodes(pointA, pointB) {
    const [dx, dy] = calculateDistance(pointA, pointB);

    // first point
    isPointInRange(pointA, dx, dy)

    // second point
    isPointInRange(pointB, -dx, -dy)
}

function isPointInRange(point, dx, dy) {
    const newPointX = point[0] + dx
    const newPointY = point[1] + dy

    if (newPointX >= 0 && newPointX < columnsNumber && newPointY >= 0 && newPointY < rowsNumber) {
        antinodes.add(`${newPointX}, ${newPointY}`)
        return true;
    }

    return false;
}

console.log(antinodes.size)