import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Menu, Search } from '../../Components';
import { VectorLayer, LineString } from 'maptalks';
import { IRouting, IRoutingItem, IStep } from '../../Interfaces';
import { createRouteLine } from '../../Utilities';
import { DirectionsItem } from './DirectionsItem';

export interface IRoutingComponent{
    className: string,
    layer: VectorLayer,
    fetchData: (inputOne: string, inputTwo: string) => Promise<IRouting>
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {

    const [route, setRoute] = useState<IRouting>(),
        [lines, setLines] = useState<IRoutingItem[]>([]);

    const addToMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(addToMap) : line.lineString?.addTo(props.layer);

    const removeFromMap = (line: IRoutingItem): void | LineString => line.subSteps ? line.subSteps.forEach(removeFromMap) : line.lineString?.remove();

    useEffect(() => {
        if (route) {
            const tempLines = createRouteLine(route.routes[0]);

            tempLines.forEach(addToMap);

            setLines(tempLines);
        }
    }, [route]);

    const handleSearch = async (inputOne: string, inputTwo: string): Promise<void> => {
        const fetchedData = await props.fetchData(inputOne, inputTwo);

        switch (fetchedData.status){
            case 'OK':
                setRoute(fetchedData);
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
    };

    return (
        <Menu className='routingMenu'>
            <Search id='routingSearch'
                inputOneLabel='Start Location'
                inputTwoLabel='End Location'
                handleSearch={handleSearch}
            />
            {
                route &&
                    <div className='outputList'>
                        {
                            lines.map(line =>
                                <DirectionsItem step={line} key={line.step.polyline.points} />
                            )
                        }
                        <button id='clearSearch' onClick={clearSearch}>Clear</button>
                    </div>
            }
        </Menu>
    );
};