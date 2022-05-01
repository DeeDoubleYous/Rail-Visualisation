import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { VectorLayer } from 'maptalks';

import { Menu } from '../../Components';
import { IRouting, IRoutingItem } from '../../Interfaces';
import { RouteSearch } from '../../Components'
import { createRouteLine, useAppDispatch, useAppSelector, centerMap, addToMap, removeFromMap } from '../../Utilities';
import { updateLayer, fetchRoute } from '../../Utilities/Routing';
import { DirectionsList } from './DirectionsList';

export interface IRoutingComponent{
    id: string,
    layer: VectorLayer
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

    useEffect(() => {
        if (route) {
            const tempLines = createRouteLine(route.routes[0]);

            setLines(tempLines);

            lines.forEach(removeFromMap);

            tempLines.forEach(line => addToMap(line, props.layer));

            centerMap(props.layer.getMap(), route);
            
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

    const handleSearch = async (inputOne: string, inputTwo: string, dateOne: string): Promise<void> => {
        const fetchedData = await fetchRoute(inputOne, inputTwo, dateOne);

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
            <Menu id='routingMenu' className='searchMenu'>
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