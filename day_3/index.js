"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
// const regex = /mul\((\d+),(\d+)\)/g;
// const matches = data.match(regex);
// let sum = 0;
// // part 1
// matches?.forEach(entry => {
//     sum += calculateSumFromText(entry)
// });
// // part 2 
// let sum2 = 0;
// // find first occuerence to dont
// const regexAllToDont = /^(.*?)(?=don't\(\))/;
// const match = data.match(regexAllToDont);
// if (match) {
//     const regex2 = /mul\((\d+),(\d+)\)/g;
//     // console.log(match[0])
//     const matches2 = match[0].match(regex2);
//     matches2?.forEach(entry => {
//         sum2 += calculateSumFromText(entry)
//     });
// }
// // beetween do and don't
// const regexFromDoToDont = /do\(\)(.*?)don't\(\)/g;
// const matchFromDoToDont = Array.from(data.matchAll(regexFromDoToDont));
// // console.log(matchFromDoToDont)
// for (const entry of matchFromDoToDont) {
//     console.log(entry[0])
//     console.log('---\n')
//     const regex2 = /mul\((\d+),(\d+)\)/g;
//     const matches2 = entry[0].match(regex2);
//     matches2?.forEach(entry2 => {
//         console.log(entry2)
//         sum2 += calculateSumFromText(entry2)
//     });
// }
var pattern2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
var instructions2 = data.match(pattern2);
var isEnabled = true;
var sum3 = instructions2 === null || instructions2 === void 0 ? void 0 : instructions2.reduce(function (acc, instruction) {
    console.log(instruction);
    if (instruction === "do()") {
        console.log("HERE2");
        isEnabled = true;
    }
    else if (instruction === "don't()") {
        console.log("HERE");
        isEnabled = false;
    }
    else if (isEnabled) {
        acc += calculateSumFromText(instruction);
    }
    return acc;
}, 0);
// console.log(sum)
// console.log(sum2)
console.log(sum3);
function calculateSumFromText(value) {
    var match = value.match(/\d+/g);
    if (match && match.length === 2) {
        return parseInt(match[0]) * parseInt(match[1]);
    }
    else {
        console.log("not found");
        return 0;
    }
}
