"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8').trim();
var splitted = data.split('\n');
var result = 0;
var rowsNumber = splitted.length;
var columnsNumber = splitted[0].length;
var ALPHABET = [];
// define all possible characters
splitted.forEach(function (value) {
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var c = value_1[_i];
        if (!ALPHABET.includes(c)) {
            ALPHABET.push(c);
        }
    }
});
//flood - fill algoritmh
function floodFill(x, y, letter, visited) {
    var stack = [[x, y]];
    var area = 0;
    var perimeter = 0;
    while (stack.length > 0) {
        var _a = stack.pop(), cx = _a[0], cy = _a[1];
        console.log(cx, cy);
        var key = "".concat(cx, ",").concat(cy);
        if (visited.has(key))
            continue;
        visited.add(key);
        area++;
        var directions = [
            [0, -1], // Up
            [0, 1], // Down
            [-1, 0], // Left
            [1, 0] // Right
        ];
        for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
            var _b = directions_1[_i], dx = _b[0], dy = _b[1];
            var nx = cx + dx;
            var ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= columnsNumber || ny >= rowsNumber) {
                perimeter++; // External border
            }
            else if (splitted[ny][nx] !== letter) {
                perimeter++; // Border with a different letter
            }
            else if (!visited.has("".concat(nx, ",").concat(ny))) {
                stack.push([nx, ny]); // Add connected cell to the stack
            }
        }
    }
    return { area: area, perimeter: perimeter };
}
ALPHABET.forEach(function (letter) {
    var areas = [];
    var visited = new Set();
    // process all data
    splitted.forEach(function (value, yIndex) {
        value.split('').forEach(function (item, xIndex) {
            // process if it is current letter from alphabet
            console.log(splitted[yIndex][xIndex]);
            console.log(letter);
            if (splitted[yIndex][xIndex] === letter && !visited.has("".concat(xIndex, ",").concat(yIndex))) {
                var _a = floodFill(xIndex, yIndex, letter, visited), area = _a.area, perimeter = _a.perimeter;
                console.log("".concat(letter, ": area = ").concat(area, ", perimeter = ").concat(perimeter));
                result += area * perimeter;
            }
        });
    });
});
console.log("Total result: ".concat(result));
