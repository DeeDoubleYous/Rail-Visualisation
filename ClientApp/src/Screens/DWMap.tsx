import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import * as Maptalks from 'maptalks';

import { IMap, ILayer } from '../Interfaces';
import { LayerMenu, LayerMenuItem, Menu } from '../Components';
import '../Styles/Screens/DWMap.css';

const DWMap: FunctionComponent<IMap> = (props): ReactElement => {
    const [map, setMap] = useState<Maptalks.Map>();
    const [activeLayer, setActiveLayer] = useState<ILayer | null>();

    useEffect(() => {
        const localMap = new Maptalks.Map('map', {
            center: [-0.119460, 50.844419],
            zoom: 13,
            minZoom: 3,
            baseLayer: new Maptalks.TileLayer('base', {
                renderer: 'gl',
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd'],
                attribution: '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, ' +
                    '&copy; <a href="https://carto.com/attributions">CARTO</a>'
            }),
            layers: [
                new Maptalks.VectorLayer('v')
            ]
        });
        setMap(localMap);

        return () => {
            map?.remove();
        }
    }, []);

    const addLayer = (layer: ILayer) => {
        if (activeLayer) {
            activeLayer.removeLayer();
        }
        setActiveLayer(layer);
        map?.addLayer(layer.getMapLayer())
    };

    const removeLayer = () => {
        if (activeLayer) {
            activeLayer.removeLayer();
        }
        setActiveLayer(null);
    };

    return (
        <div className={props.className}>
            <LayerMenu addLayer={addLayer} />
            <div id='map'/>
            {
                activeLayer && activeLayer.drawComponents()
            }
            {
                activeLayer && (
                    <Menu className='activeLayerMenu' >
                        <LayerMenuItem className={activeLayer.className} itemTitle={activeLayer.getLayerTitle()} primaryAction={removeLayer} />
                    </Menu>
                )
            }
        </div>
    );
};

export default DWMap;