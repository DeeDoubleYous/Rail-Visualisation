import { stripStation, getPostCode, genTime } from './fetchLateness';

test('Station stripper', () =>{
    expect(stripStation('Brighton Station')).toBe('Brighton');
    expect(stripStation('London Euston Station')).toBe('London Euston');
});

test('Postcode getter', () => {
    expect(getPostCode('1 Percy\'s Ln, York YO1 9TP, UK')).toBe('YO1 9TP');
    expect(getPostCode('53 Wellington Ave, Liverpool L15, UK')).toBe('L15');
});

test('Correct time format', ()=>{
    expect(genTime('6:03pm')).toStrictEqual([18, 3]);
    expect(genTime('9:45am')).toStrictEqual([9, 45]);
    expect(genTime('18:23')).toStrictEqual([18, 23]);
});