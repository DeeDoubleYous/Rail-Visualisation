import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import * as Maptalks from 'maptalks';

import { IMap } from '../Interfaces';
import '../Styles/Screens/Map.css';

const DWMap: FunctionComponent<IMap> = (props): ReactElement => {
    const [map, setMap] = useState<Maptalks.Map>();
    const [activeLayers, setActiveLayers] = useState<Maptalks.Layer[]>([]);

    useEffect(() => {
        const localMap = new Maptalks.Map('map', {
            center: [ -0.113049, 51.498568],
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

        props.layers.forEach(layer => {
            map?.addLayer(layer);
        });

        setActiveLayers(props.layers);

        return () => {
            map?.remove();
        }
    }, []);

    useEffect(() => {
        if (props.layers.length > activeLayers.length) {
            const difference = props.layers.length - activeLayers.length;
            const newLayers = props.layers.splice(0, props.layers.length - difference);

            newLayers.forEach(layer => {
                map?.addLayer(layer);
            });

            setActiveLayers(props.layers);
        } else if (props.layers.length < activeLayers.length) {
            const difference = activeLayers.length - props.layers.length;
            const removeLayers = activeLayers.splice(0, activeLayers.length - difference);

            removeLayers.forEach(layer => {
                map?.removeLayer(layer);
            });
            setActiveLayers(props.layers);
        }
    }, [props.layers]);

    if (map && props.layers) {
        map.addLayer(props.layers);
    }

    return (
        <div id='map'> </div>
    );
};

export default DWMap;