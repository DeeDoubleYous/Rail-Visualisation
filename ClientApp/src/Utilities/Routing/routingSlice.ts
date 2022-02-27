import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoutingItem } from '../../Interfaces';

interface IRoutingLayer {
    id: string,
    route: IRoutingItem[]
}

interface IRoutingStates {
    layers: IRoutingLayer[]
};

const initialState: IRoutingStates = {
    layers: []
};

export const routingSlice = createSlice({
    name: 'routingLayers',
    initialState: initialState,
    reducers: {
        addLayer: (state, action: PayloadAction<IRoutingLayer>) => {
            state.layers.push(action.payload);
        },
        removeLayer: (state, action: PayloadAction<string>) => {
            state.layers = state.layers.filter(layer => layer.id !== action.payload);
        },
        updateLayer: (state, action: PayloadAction<IRoutingLayer>) => {
            state.layers.filter(layer => layer.id !== action.payload.id).push(action.payload);
        }
    }
});

export const { addLayer, removeLayer, updateLayer } = routingSlice.actions;

export default routingSlice.reducer;