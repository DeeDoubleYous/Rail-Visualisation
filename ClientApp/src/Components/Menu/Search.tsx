import { FunctionComponent, ReactElement, useState, useRef } from 'react';
import { TextField } from '@mui/material';
import '../../Styles/Components/Menu/Search.css';

export interface ISearch {
    id: string,
    inputOneLabel: string,
    inputTwoLabel: string,
    handleSearch?: (inputOne: string, inputTwo: string) => void
}

export const Search: FunctionComponent<ISearch> = (props): ReactElement => {

    const [inputOne, setInputOne] = useState<string>('');
    const [inputTwo, setInputTwo] = useState<string>('');

    return (
        <div id={props.id} className='search'>
            <label className='inputOneLabel'>{props.inputOneLabel}</label>
            <TextField id='inputOne' variant='filled' value={inputOne} onChange={e => setInputOne(e.target.value)} />
            <label className='inputTwoLabel'>{props.inputTwoLabel}</label>
            <TextField id='inputTwo' variant='filled' value={inputTwo} onChange={e => setInputTwo(e.target.value)} />
            <button className='submit' onClick={() => {
                console.log(inputOne);
                console.log(inputTwo);
            }}>Search</button>
        </div>
    );
}