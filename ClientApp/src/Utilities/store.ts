import { configureStore } from '@reduxjs/toolkit';
import routingReducer from './Routing/routingSlice';

const store = configureStore({
    reducer: {
        routingReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;