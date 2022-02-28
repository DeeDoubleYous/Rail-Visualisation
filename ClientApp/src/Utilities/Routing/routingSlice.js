"use strict";
var _a;
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
exports.addLayer = (_a = exports.routingSlice.actions, _a.addLayer), exports.removeLayer = _a.removeLayer, exports.updateLayer = _a.updateLayer;
exports.default = exports.routingSlice.reducer;
//# sourceMappingURL=routingSlice.js.map