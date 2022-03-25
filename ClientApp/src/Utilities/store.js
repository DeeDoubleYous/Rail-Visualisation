"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var routingSlice_1 = require("./Routing/routingSlice");
var timelinessSlice_1 = require("./Timeliness/timelinessSlice");
var store = (0, toolkit_1.configureStore)({
    reducer: {
        routingReducer: routingSlice_1.default,
        timelinessReducer: timelinessSlice_1.default
    },
});
exports.default = store;
//# sourceMappingURL=store.js.map