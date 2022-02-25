"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteLine = void 0;
var maptalks_1 = require("maptalks");
var polyline_codec_1 = require("@googlemaps/polyline-codec");
var decodePolyLine = function (line) {
    var points = (0, polyline_codec_1.decode)(line.points);
    return points.map(function (_a) {
        var lat = _a[0], lng = _a[1];
        return [lng, lat];
    });
};
/**
 * *
 * A function to use to create line for the map. Unconcerned with the adding to the map only creates the line object.
 * @param startLocation
 * @param endLocation
 * @param lineColour
 * @param lineWidth
 */
var createLine = function (points, lineColour, lineWidth) { return new maptalks_1.LineString(points, {
    symbol: {
        lineColor: lineColour,
        lineWidth: lineWidth
    }
}); };
var createStepLine = function (step) {
    var colour = '#235689';
    if (step.travel_mode == 'TRANSIT' && step.transit_details) {
        colour = step.transit_details.line.color === '#000000' ? '#FFF' : step.transit_details.line.color;
    }
    return {
        step: step,
        lineString: createLine(decodePolyLine(step.polyline), colour, 3)
    };
};
var createStepLineList = function (step) { return step.steps ? [{ step: step, subSteps: step.steps.map(createStepLine) }] : [createStepLine(step)]; };
var createLineFromLeg = function (leg) { return leg.steps.map(createStepLineList).flat(); };
var createRouteLine = function (route) { return route.legs.map(createLineFromLeg).flat(); };
exports.createRouteLine = createRouteLine;
//# sourceMappingURL=LineCreation.js.map