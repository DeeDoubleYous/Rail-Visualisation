import { FunctionComponent, ReactElement} from 'react';

interface ITimelinessComponent {
    id: string,
}

export const TimelinessComponent: FunctionComponent<ITimelinessComponent> = (props): ReactElement => {
    return (
        <div id={props.id}>
        </div>
    );
};