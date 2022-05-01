import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRouting } from '../../Interfaces';

interface IRoutingLayer {
    id: string,
    route: IRouting | undefined
};

interface IRoutingStates {
    layers: IRoutingLayer[]
};

const initialState: IRoutingStates = {
    layers: [],
};


export const routingSlice = createSlice({
    name: 'routingLayers',
    initialState: initialState,
    reducers: {
        addLayer: (state: IRoutingStates, action: PayloadAction<IRoutingLayer>) => {
            state.layers = state.layers.concat(action.payload);
        },
        removeLayer: (state: IRoutingStates, action: PayloadAction<string>) => {
            state.layers = state.layers.filter(layer => layer.id !== action.payload);
        },
        updateLayer: (state: IRoutingStates, action: PayloadAction<IRoutingLayer>) => {
            state.layers = state.layers.filter(layer => layer.id !== action.payload.id).concat(action.payload)
        }
    }

});

export const addLayer = routingSlice.actions.addLayer;
export const removeLayer = routingSlice.actions.removeLayer;
export const updateLayer = routingSlice.actions.updateLayer;

export default routingSlice.reducer;