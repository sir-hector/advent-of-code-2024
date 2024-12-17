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
        antinodes.add(`${item[0]}, ${item[1]}`);
        for (let i = index + 1; i < antennas[antenna].length; i++) {
            getPossibleAntinodes2(item, antennas[antenna][i])
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

// part 2

function getPossibleAntinodes2(pointA, pointB) {
    let [dx, dy] = calculateDistance(pointA, pointB);
    let [dx2, dy2] = calculateDistance(pointA, pointB);
    let pointACondition = true;
    let pointBCondition = true;

    let currentDx = dx;
    let currentDy = dy;


    // first direction
    while (pointACondition) {
        pointACondition = isPointInRange2(pointA, currentDx, currentDy)
        currentDx += dx;
        currentDy += dy;
    }

    let currentDx2 = -dx2;
    let currentDy2 = -dy2;

    // second direction
    while (pointBCondition) {
        pointBCondition = isPointInRange2(pointB, currentDx2, currentDy2)
        currentDx2 -= dx2;
        currentDy2 -= dy2;
    }
}


function isPointInRange2(point, dx, dy) {
    const newPointX = point[0] + dx
    const newPointY = point[1] + dy

    if (newPointX >= 0 && newPointX < columnsNumber && newPointY >= 0 && newPointY < rowsNumber) {
        antinodes.add(`${newPointX}, ${newPointY}`)
        return true;
    }

    return false;
}