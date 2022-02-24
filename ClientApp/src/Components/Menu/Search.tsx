import { FunctionComponent, ReactElement, useState, useRef } from 'react';
import { createDateString } from '../../Utilities';
import '../../Styles/Components/Menu/Search.css';

export interface ISearch {
    id: string,
    inputOneLabel: string,
    inputTwoLabel: string,
    handleSearch: (inputOne: string, inputTwo: string) => void,
}

export const Search: FunctionComponent<ISearch> = (props): ReactElement => {

    const [inputOne, setInputOne] = useState<string>('');
    const [inputTwo, setInputTwo] = useState<string>('');
    const [dateOne, setDateOne] = useState<Date>(new Date(Date.now()));
    const [dateTwo, setDateTwo] = useState<Date>(new Date(Date.now()));

    return (
        <form id={props.id} className='search' autoComplete='false' onSubmit={e => {
            e.preventDefault();
            if (inputOne !== '' && inputTwo !== '') {
                props.handleSearch(inputOne, inputTwo);
            }
        }}>
            <label id='inputOneLabel' className='inputLabel'>{props.inputOneLabel}</label>
            <input id='inputOne' className='searchInput' type='text' value={inputOne} onChange={e => setInputOne(e.target.value)} />
            <input id='dateOne' type='datetime-local' value={createDateString(dateOne)} onChange={e => console.log(e.target.value)}/>
            <label id='inputTwoLabel' className='inputLabel'>{props.inputTwoLabel}</label>
            <input id='inputTwo' className='searchInput' type='text' value={inputTwo} onChange={e => setInputTwo(e.target.value)}/>
            <input type='submit' className='submit' value='submit' />
        </form>
    );
}