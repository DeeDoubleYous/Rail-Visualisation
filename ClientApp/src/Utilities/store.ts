import { configureStore } from '@reduxjs/toolkit';

import routingReducer from './Routing/routingSlice';
import timelinessReducer from './Timeliness/timelinessSlice';

const store = configureStore({
    reducer: {
        routingReducer,
        timelinessReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;