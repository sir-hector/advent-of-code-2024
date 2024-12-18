import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8').trim();
let idNumber = 0;

const splitted = data.split('').map(Number);
const unpackedDisk: string[][] = []

splitted.forEach((value, index) => {
    const file: string[] = [];
    if (index === 0 || index % 2 === 0) {
        for (let j = value; j > 0; j--) {
            file.push(idNumber.toString())
        }
        idNumber = idNumber + 1;
    }
    //empty space blok
    else {
        for (let j = value; j > 0; j--) {
            file.push(".")
        }
    }
    if (file.length) {
        unpackedDisk.push(file)
    }
})

// part 1
// unpackedDisk.forEach((value, index) => {
//     if (value === '.') {
//         while (true) {
//             const temp = unpackedDisk.pop();
//             if (temp === ".") {
//                 continue;
//             } else {
//                 if (temp) {
//                     unpackedDisk[index] = temp;
//                 }
//                 break;
//             }

//         }
//     }
// })

console.log(unpackedDisk)

// part 2 
const movedIds: string[] = [];
outer: for (let i = unpackedDisk.length - 1; i >= 0; i--) {
    // check from the end if it is not dot and not in moved ids
    if (unpackedDisk[i][0] !== '.' && !movedIds.includes(unpackedDisk[i][0])) {
        // then check from the start and check if its dot and length is enough
        for (let j = 0; j <= i; j++) {
            if (unpackedDisk[j][0] === '.' && unpackedDisk[j].length >= unpackedDisk[i].length) {
                // then if the same length replace
                // else
                // first replace then dots
                if (unpackedDisk[j].length === unpackedDisk[i].length) {
                    movedIds.push(unpackedDisk[i][0]);
                    let tmp = [...unpackedDisk[j]];
                    unpackedDisk[j] = unpackedDisk[i]
                    unpackedDisk[i] = tmp;
                    continue outer;
                } else {
                    movedIds.push(unpackedDisk[i][0]);
                    const temp = [...unpackedDisk[i]];
                    unpackedDisk[i].fill('.');
                    unpackedDisk.splice(j, 1, temp, unpackedDisk[j].slice(unpackedDisk[i].length))
                }
            }
        }
    }
}


// flat the array

const defrag = unpackedDisk.flat();


// calculate check sum
let checkSum = 0;
defrag.forEach((value, id) => {
    if (value !== '.') {
        checkSum += parseInt(value) * id
    }
})

console.log(checkSum)