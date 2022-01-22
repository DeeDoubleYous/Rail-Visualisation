import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import * as Maptalks from 'maptalks';

import { IMap } from '../Interfaces/Screens/IMap';
import '../Styles/Screens/Map.css';

const DWMap: FunctionComponent<IMap> = (props): ReactElement => {
    const [map, setMap] = useState<Maptalks.Map>();

    useEffect(() => {
        console.log('added');
        const localMap = new Maptalks.Map('map', {
            center: [-0.113049, 51.498568],
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
            ],
            zoomControl: true
        });
        setMap(localMap);
    }, []);

    return (
        <div id='map'> </div>
    );
}

export default DWMap;