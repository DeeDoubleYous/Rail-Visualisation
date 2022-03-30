"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLayer = exports.removeLayer = exports.addLayer = exports.timelinessSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    layers: []
};
exports.timelinessSlice = (0, toolkit_1.createSlice)({
    name: 'timelinessSlice',
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
exports.addLayer = exports.timelinessSlice.actions.addLayer;
exports.removeLayer = exports.timelinessSlice.actions.removeLayer;
exports.updateLayer = exports.timelinessSlice.actions.updateLayer;
exports.default = exports.timelinessSlice.reducer;
//# sourceMappingURL=timelinessSlice.js.map