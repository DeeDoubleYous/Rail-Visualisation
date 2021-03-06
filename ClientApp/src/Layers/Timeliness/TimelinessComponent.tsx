import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { VectorLayer } from 'maptalks';

import { Menu, RouteSearch } from '../../Components';
import { addToMap, centerMap, fetchRoute, removeFromMap, useAppDispatch, useAppSelector } from '../../Utilities';
import { IRouting, IAsyncRoutingItem } from '../../Interfaces';
import { updateLayer } from '../../Utilities/Timeliness';
import { createTimelinessLine } from '../../Utilities/Timeliness/timelinessCreateLine';

interface ITimelinessComponent {
    id: string,
    layer: VectorLayer
}

export const TimelinessComponent: FunctionComponent<ITimelinessComponent> = (props): ReactElement => {

    const dispatch = useAppDispatch();

    const route = useAppSelector(state => state.timelinessReducer.layers.filter(layer => layer.id === props.id)[0]?.route);
    const [lines, setLines] = useState<IAsyncRoutingItem[]>([]),
        [parentLines, setParentLines] = useState<IRouting[][]>([]);

    const setRoute = (newRoute: IRouting | undefined) => {
        dispatch(updateLayer({
            id: props.id,
            route: newRoute
        }));
    };

    useEffect(() => {
        if (route) {
            lines.forEach(removeFromMap);
            createTimelinessLine(route.routes[0]).then(async (lines) =>{
                setLines(lines);
            });
        }
    }, [route]);

    useEffect(() => {
       if(lines && route){
          lines.forEach(line => addToMap(line, props.layer));
          centerMap(props.layer.getMap(), route);
       }
    }, [lines]);

    const handleSearch = async (inputOne: string, inputTwo: string, dateOne: string): Promise<void> => {
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

      lines.forEach(line => line.subSteps)

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