import { VectorLayer, Marker } from 'maptalks';
import { ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { RoutingComponent } from './RoutingComponent';

import '../../Styles/Layers/Routing/Routing.css';
import { IRouting } from '../../Interfaces/Data/Routing';

export class Routing implements ILayer {

    mapLayer: VectorLayer;

    className: string = 'Routing';
    id: string;
    layerTitle: string = 'Routing';
    selected: boolean = false;

    constructor(className: string, id: string) {
        this.className = className;
        this.id = id;

        this.mapLayer = this.contructMapLayer();

    }

    private contructMapLayer(): VectorLayer {
        return new VectorLayer(`routing${this.id}`);
    }

    removeLayer(): void {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <RoutingComponent className={this.className} layer={this.mapLayer} fetchData={this.fetchData} />
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
    
    async fetchData(origin: string, destination: string): Promise<IRouting> {
        const data = await fetch(`/routing?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
        const text = await data.json() as IRouting;
        
        return text;
    }
}