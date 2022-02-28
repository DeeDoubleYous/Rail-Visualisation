import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import { Menu } from '../../Components';
import { VectorLayer, LineString, Coordinate } from 'maptalks';
import { IRouting, IRoutingItem } from '../../Interfaces';
import { createRouteLine, determinZoom, useAppDispatch, useAppSelector, updateLayer } from '../../Utilities';
import { DirectionsList } from './DirectionsList';
import { RouteSearch } from './RouteSearch';

export interface IRoutingComponent{
    id: string,
    className: string,
    layer: VectorLayer,
    fetchData: (inputOne: string, inputTwo: string, depature_time: Date) => Promise<IRouting>
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {

    const dispatch = useAppDispatch();

    const route = useAppSelector(state => state.routingReducer.layers.filter(layer => layer.id === props.id)[0]?.route);
    const [lines, setLines] = useState<IRoutingItem[]>([]),
        [parentLines, setParentLines] = useState<IRoutingItem[][]>([]);

    const setRoute = (newRoute: IRouting | undefined) => {
        dispatch(updateLayer({
            id: props.id,
            route: newRoute
        }));
    };

    const addToMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(addToMap) : line.lineString?.addTo(props.layer);

    const removeFromMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(removeFromMap) : line.lineString?.remove();

    const centerMap = () => {
        if (route) {
            const map = props.layer.getMap();

            const centerLng = (route.routes[0].legs[0].start_location.lng + route.routes[0].legs[0].end_location.lng) / 2;
            const centerLat = (route.routes[0].legs[0].start_location.lat + route.routes[0].legs[0].end_location.lat) / 2;

            map.setCenterAndZoom(new Coordinate([centerLng, centerLat]), determinZoom(route.routes[0].legs[0].start_location, route.routes[0].legs[0].end_location));
        }
    }

    useEffect(() => {
        if (route) {
            const tempLines = createRouteLine(route.routes[0]);

            setLines(tempLines);

            lines.forEach(removeFromMap);

            tempLines.forEach(addToMap);

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

    const handleSearch = async (inputOne: string, inputTwo: string, dateOne: Date): Promise<void> => {
        const fetchedData = await props.fetchData(inputOne, inputTwo, dateOne);

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
            <Menu id='routingMenu'>
                <RouteSearch id='routingSearch'
                    inputOneLabel='Start Location'
                    inputTwoLabel='End Location'
                    depatureTimeLabel='Depature Time'
                    handleSearch={handleSearch}
                />
            </Menu>
            {
                route &&
                <Menu id='directionMenu'>
                    <DirectionsList route={lines} clickIn={clickIn} clickOut={clickOut} inChildList={parentLines.length ? true : false} />
                    <button id='clearSearch' onClick={clearSearch}>Clear</button>
                </Menu>
            }
        </>
    );
};