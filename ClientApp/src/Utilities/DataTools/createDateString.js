"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateString = void 0;
var formatNum = function (num) { return num < 10 ? "0".concat(num) : "".concat(num); };
var createDateString = function (date) { return "".concat(date.getFullYear(), "-").concat(formatNum(date.getMonth() + 1), "-").concat(formatNum(date.getDate()), "T").concat(formatNum(date.getHours()), ":").concat(formatNum(date.getMinutes()), ":").concat(formatNum(date.getSeconds()), ".").concat(date.getMilliseconds()); };
exports.createDateString = createDateString;
