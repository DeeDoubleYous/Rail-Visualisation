﻿import { VectorLayer, Marker } from 'maptalks';
import { ReactElement } from 'react';

import { ILayer } from '../../Interfaces';

export class Stations implements ILayer {

    mapLayer: VectorLayer;

    className: string;
    id: string;
    selected: boolean = false;

    layerTitle: string = 'Stations';

    constructor(className: string, id: string) {
        this.className = className;
        this.id = id;

        this.mapLayer = this.contructMapLayer();
    }

    private contructMapLayer(): VectorLayer {
        return new VectorLayer(`routing${this.id}`, new Marker([-0.11921, 50.84217])); 
    }

    removeLayer(): void {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <>
            </>
        );
    }

    getMapLayer(): VectorLayer {
        return this.mapLayer;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(selected: boolean): void {
        this.selected = selected;
    }

    getLayerTitle(): string {
        return this.layerTitle;
    }
}