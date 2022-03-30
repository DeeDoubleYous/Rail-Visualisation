import { VectorLayer, Marker } from 'maptalks';
import { ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { RoutingComponent } from './RoutingComponent';

import '../../Styles/Layers/Routing/Routing.css';
import store from '../../Utilities/store';
import { addLayer, removeLayer } from '../../Utilities/Routing';

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
        store.dispatch(removeLayer(this.id));
    }

    drawComponents(): ReactElement {
        return (
            <RoutingComponent id={this.id} layer={this.mapLayer} key={this.id} />
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