import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import * as Maptalks from 'maptalks';

import { ILayer } from '../Interfaces';
import { LayerMenu } from '../Components';
import { ActiveMenu } from '../Components/DWMapComponents/ActiveMenu';
import { logLayerUsage } from '../Utilities/Logging';
import '../Styles/Screens/DWMap.css';

const DWMap: FunctionComponent = (): ReactElement => {
    const [map, setMap] = useState<Maptalks.Map>();
    const [selectedLayer, setSelectedLayer] = useState<ILayer | null>();
    const [activeLayers, setActiveLayers] = useState<ILayer[]>([]);

    useEffect(() => {
        const localMap = new Maptalks.Map('map', {
            center: [-0.119460, 50.844419],
            zoom: 6,
            minZoom: 6,
            baseLayer: new Maptalks.GroupTileLayer('Base TileLayer', [
                new Maptalks.TileLayer('Dark', {
                    renderer: 'gl',
                    urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                    subdomains: ['a', 'b', 'c', 'd']
                }),
                new Maptalks.TileLayer('Light', {
                    renderer: 'gl',
                    urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                    subdomains: ['a', 'b', 'c', 'd']
                }),
                
            ]),
            layerSwitcherControl:{
                'position': {'bottom': '15', 'left': '25'},
                'baseTitle': 'Map Colours',
                'container-Class': 'maptalks-layer-switcher',
                'excludeLayers': 'v'
            },
            layers: [
                new Maptalks.VectorLayer('v')
            ]
        });
        setMap(localMap);

        const zoomControl = new Maptalks.control.Zoom({
            'position': { 'bottom': '20', 'left': '1'},
            'slider': true,
            'zoomLevel': true
        });

        const attribution = new Maptalks.control.Attribution({
            content: '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, ' +
                        '&copy; <a href="https://carto.com/attributions">CARTO</a>',
            position: {'left': '75', 'bottom': '0'}
        });

        localMap.addControl(zoomControl);
        localMap.addControl(attribution);

        return () => {
            map?.remove();
        }
    }, []);

    const changeSelectedLayer = (layer: ILayer) => {
        if (selectedLayer) selectedLayer.setSelected(false);
        setSelectedLayer(layer);
        layer.setSelected(true);
    };

    const addLayer = async (layer: ILayer, layerId: number) => {
        const timeStamp = new Date(Date.now());
        timeStamp.setMonth(timeStamp.getMonth()+1);

        logLayerUsage(layerId, timeStamp);

        changeSelectedLayer(layer);
        setActiveLayers(activeLayers.concat(layer));
        map?.addLayer(layer.getMapLayer());
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
        <div className='DWMap'>
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