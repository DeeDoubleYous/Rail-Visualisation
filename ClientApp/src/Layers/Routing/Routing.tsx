import { VectorLayer, Marker } from 'maptalks';
import { ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { RoutingComponent } from './RoutingComponent';

import '../../Styles/Layers/Routing/Routing.css';
import { IRouting } from '../../Interfaces/Data/Routing';
import store from '../../Utilities/store';
import { addLayer } from '../../Utilities';

export class Routing implements ILayer {

    mapLayer: VectorLayer;
    className: string = 'Routing';
    id: string;
    selected: boolean = false;

    layerTitle: string = 'Routing';

    constructor(className: string, id: string) {

        this.className = className;
        this.id = id;

        this.mapLayer = this.contructMapLayer();
        if (id !== '1') {
            store.dispatch(addLayer({
                id: id,
                route: undefined
            }));
        }
    }

    private contructMapLayer(): VectorLayer {
        return new VectorLayer(`routing${this.id}`);
    }

    removeLayer(): void {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <RoutingComponent id={this.id} className={this.className} layer={this.mapLayer} fetchData={this.fetchData} key={this.id} />
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
    
    async fetchData(origin: string, destination: string, depature_time: Date): Promise<IRouting> {
        const data = await fetch(`/routing?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&depature_time=${encodeURIComponent(depature_time.getTime())}`);
        const text = await data.json() as IRouting;
        
        return text;
    }

    getLayerTitle(): string {
        return this.layerTitle;
    }
}