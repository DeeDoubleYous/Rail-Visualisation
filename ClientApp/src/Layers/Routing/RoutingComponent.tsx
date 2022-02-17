import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Menu, Search } from '../../Components';
import { VectorLayer, LineString } from 'maptalks';
import { IRouting, IStep } from '../../Interfaces';
import { createRouteLine } from '../../Utilities';

export interface IRoutingComponent{
    className: string,
    layer: VectorLayer,
    fetchData: (inputOne: string, inputTwo: string) => Promise<IRouting>
}

export const RoutingComponent: FunctionComponent<IRoutingComponent> = (props): ReactElement => {

    const [route, setRoute] = useState<IRouting>(),
        [lines, setLines] = useState<LineString[]>([]),
        [searched, setSearched] = useState<boolean>(false);

    //useEffect(() => {
    //    props.fetchData().then(setRoute);
    //}, []);

    useEffect(() => {
        if (route) {
            const tempLines = createRouteLine(route.routes[0]);

            tempLines.map(line => line.addTo(props.layer));

            setLines(tempLines);
        }
    }, [route]);

    const handleSearch = async (inputOne: string, inputTwo: string): Promise<void> => {
        const fetchedData = await props.fetchData(inputOne, inputTwo);

        switch (fetchedData.status){
            case 'OK':
                setRoute(fetchedData);
                setSearched(true);
                break;
            case 'ZERO_RESULTS':
                alert('not found');

        }
    };

    const clearSearch = () => {
        lines.map(line => line.remove());
        setLines([]);
        setSearched(false);
    };

    return (
        <Menu className='routingMenu'>
            <Search id='routingSearch' inputOneLabel='Start Location' inputTwoLabel='End Location' handleSearch={handleSearch} clearSearch={clearSearch} searchComplete={searched} />
            <div className='outputList'>
            </div>
        </Menu>
    );
};