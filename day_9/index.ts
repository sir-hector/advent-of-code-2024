import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', 'utf-8');
let idNumber = 0;

const splitted = data.split('').map(Number);
const unpackedDisk: string[] = []

splitted.forEach((value, index) => {
    if (index === 0 || index % 2 === 0) {
        for (let j = value; j > 0; j--) {
            unpackedDisk.push(idNumber.toString())
        }
        idNumber = idNumber + 1;
    }
    //empty space blok
    else {
        for (let j = value; j > 0; j--) {
            unpackedDisk.push(".")
        }
    }
})

console.log(unpackedDisk)
unpackedDisk.forEach((value, index) => {
    if (value === '.') {
        while (true) {
            const temp = unpackedDisk.pop();
            if (temp === ".") {
                continue;
            } else {
                if (temp) {
                    unpackedDisk[index] = temp;
                }
                break;
            }

        }
    }
})


// calculate check sum
let checkSum = 0;
unpackedDisk.forEach((value, id) => {
    checkSum += parseInt(value) * id
})

console.log(unpackedDisk)
console.log(checkSum)