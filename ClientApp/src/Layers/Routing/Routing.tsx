import { Layer, VectorLayer } from 'maptalks';
import { ReactElement } from 'react';
import { ILayer } from '../../Interfaces';

export class Routing implements ILayer {

    mapLayer: VectorLayer;

    constructor() {
        this.mapLayer = this.contructMapLayer();
    }

    private contructMapLayer(): VectorLayer {
        return new VectorLayer('routing');
    }

    removeLayer(): void {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <div>
                <p>Hello world!</p>
            </div>
        );
    }

    getMapLayer(): VectorLayer {
        return this.mapLayer;
    }

}