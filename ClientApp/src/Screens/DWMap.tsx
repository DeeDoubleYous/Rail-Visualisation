import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import * as Maptalks from 'maptalks';

import { IMap, ILayer } from '../Interfaces';
import { LayerMenu, LayerMenuItem, Menu } from '../Components';
import '../Styles/Screens/DWMap.css';
import { ActiveMenu } from '../Components/DWMapComponents/ActiveMenu';

const DWMap: FunctionComponent<IMap> = (props): ReactElement => {
    const [map, setMap] = useState<Maptalks.Map>();
    const [selectedLayer, setSelectedLayer] = useState<ILayer | null>();
    const [activeLayers, setActiveLayers] = useState<ILayer[]>([]);

    useEffect(() => {
        const localMap = new Maptalks.Map('map', {
            center: [-0.119460, 50.844419],
            zoom: 13,
            minZoom: 3,
            baseLayer: new Maptalks.TileLayer('base', {
                renderer: 'gl',
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
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

    const changeSelectedLayer = (layer: ILayer) => {
        if (selectedLayer) selectedLayer.setSelected(false);
        setSelectedLayer(layer);
        layer.setSelected(true);
    };

    const addLayer = (layer: ILayer) => {
        changeSelectedLayer(layer);
        setActiveLayers(activeLayers.concat(layer));
        map?.addLayer(layer.getMapLayer())
    };

    const removeLayer = (layer: ILayer) => {
        layer.removeLayer();
        
        setActiveLayers(activeLayers.filter(item => item !== layer));

        if (activeLayers.length - 1 > 0 && selectedLayer === layer) {
            if (layer === activeLayers[0]) {
                changeSelectedLayer(activeLayers[1]);
            } else {
                changeSelectedLayer(activeLayers[0]);
            }
        } else if(selectedLayer === layer){
            setSelectedLayer(null);
        }
    };

    return (
        <div className={props.className}>
            <LayerMenu addLayer={addLayer} />
            <div id='map' />
            <ActiveMenu activeLayers={activeLayers} removeLayer={removeLayer} changeSelectedLayer={changeSelectedLayer} />
            {
                selectedLayer && selectedLayer.drawComponents()
            }
            
        </div>
    );
};

export default DWMap;