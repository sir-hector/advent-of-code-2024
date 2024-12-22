"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8').trim();
var splitted = data.split(' ').map(Number);
var ITERATIONS = 75;
// part 1
// for (let i = 1; i <= ITERATIONS; i++) {
//     let result: number[] = [];
//     splitted.forEach(value => {
//         if (value === 0) {
//             result.push(1);
//         } else if (value.toString().split('').length % 2 === 0) {
//             const numString = value.toString();
//             const mid = numString.length / 2;
//             const part1 = numString.slice(0, mid)
//             const part2 = numString.slice(mid);
//             result.push(parseInt(part1));
//             result.push(parseInt(part2));
//         } else {
//             result.push(value * 2024);
//         }
//     })
//     splitted = [...result]
// }
// // console.log(splitted)
// console.log(splitted.length)
// part 2
var stoneCounts = new Map();
// Initialize stone counts from the input data
data.split(' ').map(Number).forEach(function (num) {
    stoneCounts.set(num, (stoneCounts.get(num) || 0) + 1);
});
var _loop_1 = function (i) {
    var newStoneCounts = new Map();
    Array.from(stoneCounts.entries()).forEach(function (_a) {
        var stone = _a[0], count = _a[1];
        if (stone === 0) {
            // Rule 1: 0 becomes 1
            newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count);
        }
        else if (stone.toString().length % 2 === 0) {
            // Rule 2: Split even-length numbers
            var numString = stone.toString();
            var mid = numString.length / 2;
            var part1 = parseInt(numString.slice(0, mid), 10);
            var part2 = parseInt(numString.slice(mid), 10);
            newStoneCounts.set(part1, (newStoneCounts.get(part1) || 0) + count);
            newStoneCounts.set(part2, (newStoneCounts.get(part2) || 0) + count);
        }
        else {
            // Rule 3: Multiply by 2024
            var newStone = stone * 2024;
            newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
        }
    });
    // Update the stone counts for the next iteration
    stoneCounts = newStoneCounts;
};
for (var i = 1; i <= ITERATIONS; i++) {
    _loop_1(i);
}
// Calculate the total number of stones
var totalStones = 0;
stoneCounts.forEach(function (count) {
    totalStones += count;
});
console.log(totalStones);
