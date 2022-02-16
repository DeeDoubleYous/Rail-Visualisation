"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteLine = void 0;
var maptalks_1 = require("maptalks");
/**
 * *
 * A function to use to create line for the map. Unconcerned with the adding to the map only creates the line object.
 * @param startLocation
 * @param endLocation
 * @param lineColour
 * @param lineWidth
 */
var createLine = function (startLocation, endLocation, lineColour, lineWidth) {
    return new maptalks_1.LineString([[startLocation.lng, startLocation.lat], [endLocation.lng, endLocation.lat]], {
        symbol: {
            lineColor: lineColour,
            lineWidth: lineWidth
        }
    });
};
var createStepLine = function (step) {
    return createLine(step.start_location, step.end_location, '#235689', 3);
};
var createStepLineList = function (step) { return step.steps ? step.steps.map(createStepLine) : [createStepLine(step)]; };
var createLineFromLeg = function (leg) {
    return leg.steps.map(createStepLineList).flat();
};
var createRouteLine = function (route) {
    return route.legs.map(createLineFromLeg).flat();
};
exports.createRouteLine = createRouteLine;
//# sourceMappingURL=LineCreation.js.map