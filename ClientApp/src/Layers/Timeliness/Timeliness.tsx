import { ReactElement } from 'react';
import { VectorLayer } from 'maptalks';

import '../../Styles/Layers/Timeliness/Timeliness.css';
import { TimelinessComponent } from './TimelinessComponent';
import store from '../../Utilities/store';
import { addLayer, removeLayer } from '../../Utilities/Timeliness';
import { ILayer } from '../../Interfaces';

export class Timeliness implements ILayer {

    mapLayer: VectorLayer;
    className: string = 'Timeliness';

    id: string;
    selected: boolean = false;

    layerTitle: string = 'Timeliness';

    constructor(className: string, id: string) {
        this.className = className;
        this.id = id;

        this.mapLayer = this.constructMapLayer();

        if (id !== '1') {
            store.dispatch(addLayer({
                id: id,
                route: undefined
            }));
        }
    }

    private constructMapLayer(): VectorLayer {
        return new VectorLayer(`Timeliness${this.id}`);
    }

    removeLayer() {
        this.mapLayer.remove();
        store.dispatch(removeLayer(this.id));
    }

    drawComponents(): ReactElement {
        return (
            <TimelinessComponent id='timeliness' layer={this.mapLayer} />
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