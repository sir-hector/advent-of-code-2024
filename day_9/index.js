"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8').trim();
var idNumber = 0;
var splitted = data.split('').map(Number);
var unpackedDisk = [];
splitted.forEach(function (value, index) {
    var file = [];
    if (index === 0 || index % 2 === 0) {
        for (var j = value; j > 0; j--) {
            file.push(idNumber.toString());
        }
        idNumber = idNumber + 1;
    }
    //empty space blok
    else {
        for (var j = value; j > 0; j--) {
            file.push(".");
        }
    }
    if (file.length) {
        unpackedDisk.push(file);
    }
});
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
console.log(unpackedDisk);
// part 2 
var movedIds = [];
outer: for (var i = unpackedDisk.length - 1; i >= 0; i--) {
    // check from the end if it is not dot and not in moved ids
    if (unpackedDisk[i][0] !== '.' && !movedIds.includes(unpackedDisk[i][0])) {
        // then check from the start and check if its dot and length is enough
        for (var j = 0; j <= i; j++) {
            if (unpackedDisk[j][0] === '.' && unpackedDisk[j].length >= unpackedDisk[i].length) {
                // then if the same length replace
                // else
                // first replace then dots
                if (unpackedDisk[j].length === unpackedDisk[i].length) {
                    movedIds.push(unpackedDisk[i][0]);
                    var tmp = __spreadArray([], unpackedDisk[j], true);
                    unpackedDisk[j] = unpackedDisk[i];
                    unpackedDisk[i] = tmp;
                    continue outer;
                }
                else {
                    movedIds.push(unpackedDisk[i][0]);
                    var temp = __spreadArray([], unpackedDisk[i], true);
                    unpackedDisk[i].fill('.');
                    unpackedDisk.splice(j, 1, temp, unpackedDisk[j].slice(unpackedDisk[i].length));
                }
            }
        }
    }
}
// flat the array
var defrag = unpackedDisk.flat();
// calculate check sum
var checkSum = 0;
defrag.forEach(function (value, id) {
    if (value !== '.') {
        checkSum += parseInt(value) * id;
    }
});
console.log(checkSum);
