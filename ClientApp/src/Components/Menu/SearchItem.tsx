import { ChangeEventHandler, FunctionComponent, ReactElement } from 'react';

interface ISearchItem {
    id: string,
    className: string,
    type: string,
    label: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

export const SearchItem: FunctionComponent<ISearchItem> = (props): ReactElement => {

    let inputElem = (<></>);

    switch (props.type) {
        case 'text':
            inputElem = (
                <>
                    <input id={props.id} className={props.className} type='text' value={props.value} onChange={props.onChange} />
                </>
            );
            break;
        case 'dateTime':
            inputElem = (
                <>
                    <input id={props.id} className={props.className} type='datetime-local' value={props.value} onChange={props.onChange} />
                </>
            );
            break;
    }

    return (
        <>
            <label id={`${props.id}Label`} className='inputLabel'>{props.label}</label>
            {
                inputElem
            }
        </>
    );
}