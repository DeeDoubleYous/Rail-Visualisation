"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determinZoom = exports.workOutLength = void 0;
var workOutLength = function (startLoc, endLoc) {
    var x = (endLoc.lng - startLoc.lng);
    var y = (endLoc.lat - startLoc.lat);
    return Math.sqrt((x * x) + (y * y));
};
exports.workOutLength = workOutLength;
var determinZoom = function (startLoc, endLoc) {
    var length = (0, exports.workOutLength)(startLoc, endLoc);
    if (length > 5) {
        return 5;
    }
    else if (length <= 5 && length > 3) {
        return 7;
    }
    else {
        return 10;
    }
};
exports.determinZoom = determinZoom;
//# sourceMappingURL=determinZoom.js.map