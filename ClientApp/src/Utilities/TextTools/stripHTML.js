"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripHTML = void 0;
var stripHTML = function (text) {
    var regex = /[<][^>]+[>]/ig;
    return text.replaceAll(regex, ' ');
};
exports.stripHTML = stripHTML;
//# sourceMappingURL=stripHTML.js.map