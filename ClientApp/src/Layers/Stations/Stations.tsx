import { VectorLayer, Marker } from 'maptalks';
import { ReactElement } from 'react';

import { ILayer } from '../../Interfaces';

export class Stations implements ILayer {

    mapLayer: VectorLayer;

    className: string;
    id: string;
    layerTitle: string = 'Stations';
    selected: boolean = false;

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

    getLayerTitle(): string {
        return this.layerTitle;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(selected: boolean): void {
        this.selected = selected;
    }
}