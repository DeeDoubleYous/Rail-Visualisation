import { ReactElement } from 'react';
import { VectorLayer } from 'maptalks';
import { Menu } from '../../Components';
import { ILayer } from '../../Interfaces';

import '../../Styles/Layers/Timeliness/Timeliness.css';

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
    }

    private constructMapLayer(): VectorLayer {
        return new VectorLayer(`Timeliness${this.id}`);
    }

    removeLayer() {
        this.mapLayer.remove();
    }

    drawComponents(): ReactElement {
        return (
            <Menu id='timeliness'>
                <button onClick={this.gets}>Test</button>
            </Menu>  
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
        console.log('I have been run');
        await fetch('/timeliness');
    }

}