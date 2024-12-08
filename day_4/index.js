"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
var splitted = data.split('\n');
var count = 0;
// horizontal (+backwords)
splitted.forEach(function (line, index) {
    var pattern2 = /XMAS|SAMX/g;
    var match;
    while ((match = pattern2.exec(line)) !== null) {
        count++;
        pattern2.lastIndex = match.index + 1;
    }
});
// vertical 
splitted.forEach(function (line, lineIndex) {
    // -- XMAS -- 
    line.split('').forEach(function (letter, letterIndex) {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 0, 'XMAS')) {
            count++;
        }
    });
    // SAMX // 
    line.split('').forEach(function (letter, letterIndex) {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 0, 'SAMX')) {
            count++;
        }
    });
});
// diagonall right -> lew
splitted.forEach(function (line, lineIndex) {
    // -- XMAS -- 
    line.split('').forEach(function (letter, letterIndex) {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 1, 'XMAS')) {
            count++;
        }
    });
    // SAMX // 
    line.split('').forEach(function (letter, letterIndex) {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, 1, 'SAMX')) {
            count++;
        }
    });
});
// diagonall lew -> right
splitted.forEach(function (line, lineIndex) {
    // -- XMAS -- 
    line.split('').forEach(function (letter, letterIndex) {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, -1, 'XMAS')) {
            count++;
        }
    });
    // SAMX // 
    line.split('').forEach(function (letter, letterIndex) {
        if (searchDirection(splitted, lineIndex, letterIndex, 1, -1, 'SAMX')) {
            count++;
        }
    });
});
console.log(count);
// part 1 
function searchDirection(grid, startX, startY, dx, dy, pattern) {
    for (var i = 0; i < pattern.length; i++) {
        var x = startX + i * dx;
        var y = startY + i * dy;
        if (x < 0 ||
            x >= grid.length ||
            y < 0 ||
            y >= grid[x].length ||
            grid[x][y] !== pattern[i]) {
            return false;
        }
    }
    return true;
}
// part 2
var sum2 = 0;
function searchDirection2(grid, startY, startX) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    console.log(grid[startY][startX]);
    if (((_a = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _a === void 0 ? void 0 : _a[startY - 1]) === "M" &&
        ((_b = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _b === void 0 ? void 0 : _b[startY + 1]) === "S" &&
        ((_c = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _c === void 0 ? void 0 : _c[startY - 1]) === "M" &&
        ((_d = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _d === void 0 ? void 0 : _d[startY + 1]) === "S") {
        sum2++;
    }
    if (((_e = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _e === void 0 ? void 0 : _e[startY - 1]) === "M" &&
        ((_f = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _f === void 0 ? void 0 : _f[startY + 1]) === "M" &&
        ((_g = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _g === void 0 ? void 0 : _g[startY - 1]) === "S" &&
        ((_h = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _h === void 0 ? void 0 : _h[startY + 1]) === "S") {
        sum2++;
    }
    if (((_j = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _j === void 0 ? void 0 : _j[startY - 1]) === "S" &&
        ((_k = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _k === void 0 ? void 0 : _k[startY + 1]) === "S" &&
        ((_l = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _l === void 0 ? void 0 : _l[startY - 1]) === "M" &&
        ((_m = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _m === void 0 ? void 0 : _m[startY + 1]) === "M") {
        sum2++;
    }
    if (((_o = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _o === void 0 ? void 0 : _o[startY - 1]) === "S" &&
        ((_p = splitted === null || splitted === void 0 ? void 0 : splitted[startX - 1]) === null || _p === void 0 ? void 0 : _p[startY + 1]) === "M" &&
        ((_q = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _q === void 0 ? void 0 : _q[startY - 1]) === "S" &&
        ((_r = splitted === null || splitted === void 0 ? void 0 : splitted[startX + 1]) === null || _r === void 0 ? void 0 : _r[startY + 1]) === "M") {
        sum2++;
    }
}
splitted.forEach(function (line, lineIndex) {
    line.split('').forEach(function (letter, letterIndex) {
        if (letter === 'A') {
            console.log('A' + letterIndex + lineIndex);
            searchDirection2(splitted, letterIndex, lineIndex);
        }
    });
});
console.log(sum2);
