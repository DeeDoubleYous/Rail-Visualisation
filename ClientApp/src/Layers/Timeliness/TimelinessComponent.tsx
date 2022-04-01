﻿import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Menu, RouteSearch } from '../../Components';
import { addToMap, centerMap, createRouteLine, fetchRoute, removeFromMap, useAppDispatch, useAppSelector } from '../../Utilities';
import { IRouting, IRoutingItem } from '../../Interfaces';
import { updateLayer } from '../../Utilities/Timeliness';
import { VectorLayer } from 'maptalks';
import { fetchLateness } from '../../Utilities/Timeliness/fetchLateness';

interface ITimelinessComponent {
    id: string,
    layer: VectorLayer
}

export const TimelinessComponent: FunctionComponent<ITimelinessComponent> = (props): ReactElement => {

    const dispatch = useAppDispatch();

    const route = useAppSelector(state => state.timelinessReducer.layers.filter(layer => layer.id === props.id)[0]?.route);
    const [lines, setLines] = useState<IRoutingItem[]>([]),
        [parentLines, setParentLines] = useState<IRouting[][]>([]);

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

    const handleSearch = async (inputOne: string, inputTwo: string, dateOne: Date): Promise<void> => {
        const fetchedData = await fetchRoute(inputOne, inputTwo, dateOne);

        switch (fetchedData.status) {
            case 'OK':
                setRoute(fetchedData);
                setParentLines([]);
                break;
            case 'ZERO_RESULTS':
                alert('not found');
                break;
        }
    }

    return (
        <Menu id='timelinessMenu' className='searchMenu'>
            <RouteSearch id='routingSearch'
                depatureTimeLabel='Depature Time'
                inputOneLabel='Start location'
                inputTwoLabel='End location'
                handleSearch={handleSearch}
            />
        </Menu>
    );
};