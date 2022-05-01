import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRouting } from '../../Interfaces';

interface ITimelinessLayer {
    id: string,
    route: IRouting | undefined
}

interface ITimelinessStates {
    layers: ITimelinessLayer[]
}

const initialState: ITimelinessStates = {
    layers: []
}

export const timelinessSlice = createSlice({
    name: 'timelinessSlice',
    initialState: initialState,
    reducers: {
        addLayer: (state: ITimelinessStates, action: PayloadAction<ITimelinessLayer>) => {
            state.layers = state.layers.concat(action.payload);
        },
        removeLayer: (state: ITimelinessStates, action: PayloadAction<string>) => {
            state.layers = state.layers.filter(layer => layer.id !== action.payload);
        },
        updateLayer: (state: ITimelinessStates, action: PayloadAction<ITimelinessLayer>) => {
            state.layers = state.layers.filter(layer => layer.id !== action.payload.id).concat(action.payload)
        }
    }
});

export const addLayer = timelinessSlice.actions.addLayer;
export const removeLayer = timelinessSlice.actions.removeLayer;
export const updateLayer = timelinessSlice.actions.updateLayer;

export default timelinessSlice.reducer;