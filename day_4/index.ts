import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
const splitted = data.split('\n');
let count = 0;

// horizontal (+backwords)
splitted.forEach((line, index) => {
    const pattern2 = /XMAS|SAMX/g;
    let match;
    while ((match = pattern2.exec(line)) !== null) {
        count++;
        pattern2.lastIndex = match.index + 1;
    }
});

// vertical 
splitted.forEach((line, lineIndex) => {
    // -- XMAS -- 
    line.split('').forEach((letter, letterIndex) => {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 0, 'XMAS')) {
            count++
        }
    })
    // SAMX // 
    line.split('').forEach((letter, letterIndex) => {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 0, 'SAMX')) {
            count++
        }
    })
})

// diagonall right -> lew
splitted.forEach((line, lineIndex) => {
    // -- XMAS -- 
    line.split('').forEach((letter, letterIndex) => {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 1, 'XMAS')) {
            count++
        }
    })
    // SAMX // 
    line.split('').forEach((letter, letterIndex) => {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 1, 'SAMX')) {
            count++
        }
    })
})

// diagonall lew -> right
splitted.forEach((line, lineIndex) => {
    // -- XMAS -- 
    line.split('').forEach((letter, letterIndex) => {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, -1, 'XMAS')) {
            count++
        }
    })
    // SAMX // 
    line.split('').forEach((letter, letterIndex) => {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, -1, 'SAMX')) {
            count++
        }
    })
})


console.log(count)

// part 1 
function searchDirection(grid, startX, startY, dx, dy, pattern) {
    for (let i = 0; i < pattern.length; i++) {
        const x = startX + i * dx;
        const y = startY + i * dy;
        if (
            x < 0 ||
            x >= grid.length ||
            y < 0 ||
            y >= grid[x].length ||
            grid[x][y] !== pattern[i]
        ) {
            return false;
        }
    }
    return true;
}

// part 2
let sum2 = 0;

function searchDirection2(startY, startX) {
    if (
        splitted?.[startX - 1]?.[startY - 1] === "M" &&
        splitted?.[startX - 1]?.[startY + 1] === "S" &&
        splitted?.[startX + 1]?.[startY - 1] === "M" &&
        splitted?.[startX + 1]?.[startY + 1] === "S"
    ) {
        sum2++
    }
    if (
        splitted?.[startX - 1]?.[startY - 1] === "M" &&
        splitted?.[startX - 1]?.[startY + 1] === "M" &&
        splitted?.[startX + 1]?.[startY - 1] === "S" &&
        splitted?.[startX + 1]?.[startY + 1] === "S"
    ) {
        sum2++
    }
    if (
        splitted?.[startX - 1]?.[startY - 1] === "S" &&
        splitted?.[startX - 1]?.[startY + 1] === "S" &&
        splitted?.[startX + 1]?.[startY - 1] === "M" &&
        splitted?.[startX + 1]?.[startY + 1] === "M"
    ) {
        sum2++
    }
    if (
        splitted?.[startX - 1]?.[startY - 1] === "S" &&
        splitted?.[startX - 1]?.[startY + 1] === "M" &&
        splitted?.[startX + 1]?.[startY - 1] === "S" &&
        splitted?.[startX + 1]?.[startY + 1] === "M"
    ) {
        sum2++
    }

}

splitted.forEach((line, lineIndex) => {
    line.split('').forEach((letter, letterIndex) => {
        if (letter === 'A') {
            searchDirection2(letterIndex, lineIndex)
        }
    });
});

console.log(sum2)