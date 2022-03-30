import { FunctionComponent, ReactElement } from 'react';
import { Menu, RouteSearch } from '../../Components';
import { useAppDispatch, useAppSelector } from '../../Utilities';
import { IRouting } from '../../Interfaces';
import { updateLayer } from '../../Utilities/Timeliness';

interface ITimelinessComponent {
    id: string,
}

export const TimelinessComponent: FunctionComponent<ITimelinessComponent> = (props): ReactElement => {

    const dispatch = useAppDispatch();

    const route = useAppSelector(state => state.timelinessReducer.layers.filter(layer => layer.id === props.id)[0]?.route);

    const setRoute = (newRoute: IRouting | undefined) => {
        dispatch(updateLayer({
            id: props.id,
            route: newRoute
        }));
    };



    return (
        <Menu id={props.id}>
            <RouteSearch id='timelinessSearch'
                depatureTimeLabel='Depature Time'
                inputOneLabel='Start location'
                inputTwoLabel='End location'
                handleSearch={(inputOne: string, inputTwo: string, depature_time: Date) => {
                    console.log(`one: ${inputOne} two: ${inputTwo} time:${depature_time}`);
                } }
            />
        </Menu>
    );
};