import { ReactElement } from 'react';
import { VectorLayer } from 'maptalks';
import { ILayer } from '../../Interfaces';

import '../../Styles/Layers/Timeliness/Timeliness.css';
import { createDateString } from '../../Utilities';
import { TimelinessComponent } from './TimelinessComponent';
import store from '../../Utilities/store';
import { addLayer, removeLayer } from '../../Utilities/Timeliness';

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

    private async gets(): Promise<void> {
        const searchTime = new Date('2022/03/25 19:02:00');

        const result = await fetch(`/timeliness?start=${encodeURIComponent('London Euston')}&end=${encodeURIComponent('Liverpool lime street')}&travelTime=${createDateString(searchTime)}`);

        const lateness = await result.json() as number;

        console.log(lateness);
    }

}