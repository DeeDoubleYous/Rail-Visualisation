import { VectorLayer } from 'maptalks';
import { ReactElement } from 'react';
import { ILayer } from '../../Interfaces';
import { RoutingComponent } from './RoutingComponent';

export class Routing implements ILayer {

    mapLayer: VectorLayer;

    className: string;
    id: string;

    constructor(className: string, id: string) {
        this.mapLayer = this.contructMapLayer();

        this.className = className;
        this.id = id;
    }

    private contructMapLayer(): VectorLayer {
        return new VectorLayer(`routing${this.id}`);
    }

    removeLayer(): void {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <RoutingComponent/>
        );
    }

    getMapLayer(): VectorLayer {
        return this.mapLayer;
    }


}