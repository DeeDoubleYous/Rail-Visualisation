import { FormEventHandler, FunctionComponent, ReactElement, useState } from 'react';
import { SearchItem } from '../../Components';
import { createDateString } from '../../Utilities';
import '../../Styles/Layers/Routing/RouteSearch.css';

export interface ISearch {
    id: string,
    inputOneLabel: string,
    inputTwoLabel: string,
    dateOneLabel: string,
    dateTwoLabel: string,
    handleSearch: (inputOne: string, inputTwo: string) => void,
}

export const RouteSearch: FunctionComponent<ISearch> = (props): ReactElement => {

    const [inputOne, setInputOne] = useState<string>('');
    const [inputTwo, setInputTwo] = useState<string>('');
    const [dateOne, setDateOne] = useState<Date>(new Date(Date.now()));
    const [dateTwo, setDateTwo] = useState<Date>(new Date(Date.now()));

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (inputOne !== '' && inputTwo !== '') {
            props.handleSearch(inputOne, inputTwo);
        }
    };

    return (
        <form id={props.id} className='search' autoComplete='false' onSubmit={handleSubmit}>
            <SearchItem id='inputOne' className='searchInput' type='text' label={props.inputOneLabel} value={inputOne} onChange={e => setInputOne(e.target.value)} />
            <SearchItem id='inputTwo' className='searchInput' type='text' label={props.inputTwoLabel} value={inputTwo} onChange={e => setInputTwo(e.target.value)} />
            <SearchItem id='dateOne' className='searchInput' type='dateTime' label={props.dateOneLabel} value={createDateString(dateOne)} onChange={e => setDateOne(new Date(e.target.value))} />
            <SearchItem id='dateTwo' className='searchInput' type='dateTime' label={props.dateTwoLabel} value={createDateString(dateTwo)} onChange={e => setDateTwo(new Date(e.target.value))} />
            <input type='submit' className='submit' value='Search Route' />
        </form>
    );
}