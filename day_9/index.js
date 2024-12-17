"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var idNumber = 0;
var splitted = data.split('').map(BigInt);
var unpackedDisk = [];
splitted.forEach(function (value, index) {
    if (index === 0 || index % 2 === 0) {
        for (var j = value; j > 0; j--) {
            unpackedDisk.push(idNumber.toString());
        }
        idNumber = idNumber + 1;
    }
    //empty space blok
    else {
        for (var j = value; j > 0; j--) {
            unpackedDisk.push(".");
        }
    }
});
console.log(unpackedDisk);
unpackedDisk.forEach(function (value, index) {
    if (value === '.') {
        while (true) {
            var temp = unpackedDisk.pop();
            if (temp === ".") {
                continue;
            }
            else {
                if (temp) {
                    unpackedDisk[index] = temp;
                }
                break;
            }
        }
    }
});
// calculate check sum
var checkSum = 0;
unpackedDisk.forEach(function (value, id) {
    checkSum += parseInt(value) * id;
});
console.log(unpackedDisk);
console.log(checkSum);
