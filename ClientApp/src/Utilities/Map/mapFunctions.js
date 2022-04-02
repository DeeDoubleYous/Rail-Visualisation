"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerMap = exports.removeFromMap = exports.addToMap = void 0;
var maptalks_1 = require("maptalks");
var Routing_1 = require("../Routing");
var addToMap = function (line, layer) { var _a; return line.subSteps ? line.subSteps.forEach(function (step) { return (0, exports.addToMap)(step, layer); }) : (_a = line.lineString) === null || _a === void 0 ? void 0 : _a.addTo(layer); };
exports.addToMap = addToMap;
var removeFromMap = function (line) { var _a; return line.subSteps ? line.subSteps.forEach(exports.removeFromMap) : (_a = line.lineString) === null || _a === void 0 ? void 0 : _a.remove(); };
exports.removeFromMap = removeFromMap;
var centerMap = function (map, route) {
    var centerLng = (route.routes[0].legs[0].start_location.lng + route.routes[0].legs[0].end_location.lng) / 2;
    var centerLat = (route.routes[0].legs[0].start_location.lat + route.routes[0].legs[0].end_location.lat) / 2;
    map.setCenterAndZoom(new maptalks_1.Coordinate([centerLng, centerLat]), (0, Routing_1.determinZoom)(route.routes[0].legs[0].start_location, route.routes[0].legs[0].end_location));
};
exports.centerMap = centerMap;
//# sourceMappingURL=mapFunctions.js.map