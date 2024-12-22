import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8').trim();
const splitted = data.split('\n');
const rowsNumber = splitted.length;
const columnsNumber = splitted[0].length;

// find trailheads - value 0
let trailheadsIndexes: string[] = searchIndexes(0)
let score = 0;

// get positions from neighbourhood of (value ++)
// part 2 
for (let i = 1; i < 10; i++) {
    const newIndexes = trailheadsIndexes.flatMap(value => searchNextIndexes(value, i));
    trailheadsIndexes = [];
    trailheadsIndexes = [...newIndexes];
}

console.log(trailheadsIndexes)
console.log(trailheadsIndexes.length)

// part 1 
// trailheadsIndexes.forEach(value => {
//     const trailHeadScore = new Set<string>();
//     let indexes = [value];
//     for (let i = 1; i < 10; i++) {
//         indexes = indexes.flatMap(value => searchNextIndexes(value, i));
//     };

//     indexes.forEach(value => trailHeadScore.add(value))
//     // console.log(indexes)
//     console.log("trailHeadScore.size")
//     console.log(trailHeadScore.size)
//     score += trailHeadScore.size
// })

console.log("score");
console.log(score);

function searchIndexes(searchValue) {
    const indexes: string[] = [];
    splitted.forEach((row, yIndex) => {
        row.split('').forEach((value, xIndex) => {
            if (parseInt(value) === searchValue) {
                indexes.push(`${xIndex}-${yIndex}`)
            }
        });
    });
    return indexes;
}

function searchNextIndexes(index, searchValue: number) {
    const indexes: string[] = [];
    const splittedIndex = index.split('-');
    const xIndex: number = parseInt(splittedIndex[0], 10);
    const yIndex: number = parseInt(splittedIndex[1], 10);


    const neighborDirs: number[][] = [
        // [-1, -1],
        [0, -1],
        // [1, -1],
        [-1, 0],
        [1, 0],
        // [-1, 1],
        [0, 1],
        // [1, 1]
    ];

    neighborDirs.forEach(value => {
        const newXindex = xIndex + value[0];
        const newYindex = yIndex + value[1];

        if (newXindex >= 0 && newYindex >= 0 && newXindex < columnsNumber && newYindex < rowsNumber && parseInt(splitted[newYindex][newXindex]) === searchValue) {
            indexes.push(`${newXindex}-${newYindex}`)
        }
    })

    return indexes;
}