"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var routingSlice_1 = require("./Routing/routingSlice");
var store = (0, toolkit_1.configureStore)({
    reducer: {
        routingReducer: routingSlice_1.default
    },
    middleware: function (getDefaultMiddleWare) { return getDefaultMiddleWare(); },
});
exports.default = store;
//# sourceMappingURL=store.js.map