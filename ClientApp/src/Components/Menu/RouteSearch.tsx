import { FormEventHandler, FunctionComponent, ReactElement, useState } from 'react';
import { SearchItem } from '../../Components';
import { createDateString } from '../../Utilities';
import '../../Styles/Components/Menu/RouteSearch.css';

export interface ISearch {
    id: string,
    inputOneLabel: string,
    inputTwoLabel: string,
    depatureTimeLabel: string,
    handleSearch: (inputOne: string, inputTwo: string, depature_time: Date) => void,
}

export const RouteSearch: FunctionComponent<ISearch> = (props): ReactElement => {

    const [inputOne, setInputOne] = useState<string>('');
    const [inputTwo, setInputTwo] = useState<string>('');
    const [depatureTime, setDepatureTime] = useState<Date>(new Date(Date.now()));

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (inputOne !== '' && inputTwo !== '') {
            props.handleSearch(inputOne, inputTwo, depatureTime);
        }
    };

    return (
        <form id={props.id} className='search' autoComplete='false' onSubmit={handleSubmit}>
            <SearchItem id='inputOne' className='searchInput' type='text' label={props.inputOneLabel} value={inputOne} onChange={e => setInputOne(e.target.value)} />
            <SearchItem id='inputTwo' className='searchInput' type='text' label={props.inputTwoLabel} value={inputTwo} onChange={e => setInputTwo(e.target.value)} />
            <SearchItem id='dateOne' className='searchInput' type='dateTime' label={props.depatureTimeLabel} value={createDateString(depatureTime)} onChange={e => setDepatureTime(new Date(e.target.value))} />
            <input type='submit' className='submit' value='Search Route' />
        </form>
    );
}