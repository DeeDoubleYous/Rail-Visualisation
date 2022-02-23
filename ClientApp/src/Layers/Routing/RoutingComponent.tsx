﻿import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Menu, Search } from '../../Components';
import { VectorLayer, LineString, Coordinate } from 'maptalks';
import { IRouting, IRoutingItem, IStep } from '../../Interfaces';
import { createRouteLine } from '../../Utilities';
import { DirectionsList } from './DirectionsList';

export interface IRoutingComponent{
    className: string,
    layer: VectorLayer,
    fetchData: (inputOne: string, inputTwo: string) => Promise<IRouting>
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {

    const [route, setRoute] = useState<IRouting>(),
        [lines, setLines] = useState<IRoutingItem[]>([]),
        [parentLines, setParentLines] = useState<IRoutingItem[][]>([]);

    const addToMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(addToMap) : line.lineString?.addTo(props.layer);

    const removeFromMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(removeFromMap) : line.lineString?.remove();

    const centerMap = () => {
        if (route) {
            const map = props.layer.getMap();

            const centerLng = (route.routes[0].legs[0].start_location.lng + route.routes[0].legs[0].end_location.lng) / 2;
            const centerLat = (route.routes[0].legs[0].start_location.lat + route.routes[0].legs[0].end_location.lat) / 2;

            map.setCenterAndZoom(new Coordinate([centerLng, centerLat]), 7);
        }
    }

    useEffect(() => {
        if (route) {
            const tempLines = createRouteLine(route.routes[0]);

            tempLines.forEach(addToMap);

            lines.forEach(removeFromMap);

            setLines(tempLines);

            centerMap();
        }
    }, [route]);

    const clickIn = (subSteps: IRoutingItem[]) => {
        setParentLines([lines].concat(parentLines));
        setLines(subSteps);
    };

    const clickOut = () => {
        setLines(parentLines[0]);
        setParentLines(parentLines.slice(1));
    };

    const handleSearch = async (inputOne: string, inputTwo: string): Promise<void> => {
        const fetchedData = await props.fetchData(inputOne, inputTwo);

        switch (fetchedData.status){
            case 'OK':
                setRoute(fetchedData);
                setParentLines([]);
                break;
            case 'ZERO_RESULTS':
                alert('not found');
                break;

        }
    };

    const clearSearch = () => {
        lines.forEach(removeFromMap);
        setLines([]);
        setRoute(undefined);
        if (parentLines.length) {
            parentLines.map(line => line.map(removeFromMap));
            setParentLines([]);
        }
    };

    return (
        <>
            <Menu className='routingMenu'>
                <Search id='routingSearch'
                    inputOneLabel='Start Location'
                    inputTwoLabel='End Location'
                    handleSearch={handleSearch}
                />
            </Menu>
            {
                route &&
                <Menu className='directionMenu'>
                    <DirectionsList route={lines} clickIn={clickIn} clickOut={clickOut} inChildList={parentLines.length ? true : false} />
                    <button id='clearSearch' onClick={clearSearch}>Clear</button>
                </Menu>
            }
        </>
    );
};