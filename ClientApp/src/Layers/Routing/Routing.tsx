import { VectorLayer, Marker } from 'maptalks';
import { ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { RoutingComponent } from './RoutingComponent';

import '../../Styles/Layers/Routing/Routing.css';

export class Routing implements ILayer {

    mapLayer: VectorLayer;

    className: string;
    id: string;
    layerTitle: string = 'Routing';
    selected: boolean = false;

    constructor(className: string, id: string) {
        this.className = className;
        this.id = id;

        this.mapLayer = this.contructMapLayer();

        this.fetchData();

    }

    private contructMapLayer(): VectorLayer {
        return new VectorLayer(`routing${this.id}`, new Marker([-0.119460, 50.844419]));
    }

    removeLayer(): void {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <RoutingComponent className={this.className} />
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

    async fetchData() {
        const data = await fetch('/routing');
        const text = await data.json();

        console.log(text);
    }
}