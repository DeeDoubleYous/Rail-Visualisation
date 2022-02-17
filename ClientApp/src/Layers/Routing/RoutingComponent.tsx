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

    //const [route, setRoute] = useState<IRouting>();

    //useEffect(() => {
    //    props.fetchData().then(setRoute);
    //}, []);

    //useEffect(() => {
    //    if(route) createRouteLine(route.routes[0]).map(line => line.addTo(props.layer));
    //}, [route]);

    const handleSearch = async (inputOne: string, inputTwo: string): Promise<void> => {
        const route = await props.fetchData(inputOne, inputTwo);
        console.log(route);
    };

    return (
        <Menu className='routingMenu'>
            <Search id='routingSearch' inputOneLabel='Start Location' inputTwoLabel='End Location' handleSearch={handleSearch} />
            <div className='outputList'>
            </div>
        </Menu>
    );
};