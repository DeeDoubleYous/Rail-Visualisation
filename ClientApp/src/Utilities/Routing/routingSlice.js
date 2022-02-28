"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLayer = exports.removeLayer = exports.addLayer = exports.routingSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
;
;
var initialState = {
    layers: [],
};
exports.routingSlice = (0, toolkit_1.createSlice)({
    name: 'routingLayers',
    initialState: initialState,
    reducers: {
        addLayer: function (state, action) {
            state.layers = state.layers.concat(action.payload);
        },
        removeLayer: function (state, action) {
            state.layers = state.layers.filter(function (layer) { return layer.id !== action.payload; });
        },
        updateLayer: function (state, action) {
            state.layers = state.layers.filter(function (layer) { return layer.id !== action.payload.id; }).concat(action.payload);
        }
    }
});
exports.addLayer = exports.routingSlice.actions.addLayer;
exports.removeLayer = exports.routingSlice.actions.removeLayer;
exports.updateLayer = exports.routingSlice.actions.updateLayer;
exports.default = exports.routingSlice.reducer;
//# sourceMappingURL=routingSlice.js.map