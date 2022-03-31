import { getDestOrig } from "./getDestOrig";

test('Test getting the start and end 1', () => {
    const expectedResult = ['Euston', 'Liverpool Lime Street'];
    expect(getDestOrig('Liverpool Lime Street - Euston', 'Train towards Liverpool Lime Street')).toStrictEqual(expectedResult);
    expect(getDestOrig('Euston - Liverpool Lime Street - Euston', 'Train towards Liverpool Lime Street')).toStrictEqual(expectedResult);
});

test('Test getting the start and end 2', () => {
    const expectedResult = ['Ascott-Under-Wychwood', 'Betws-y-Coed'];
    expect(getDestOrig('Ascott-Under-Wychwood - Betws-y-Coed', 'Train towards Betws-y-Coed')).toStrictEqual(expectedResult);
    expect(getDestOrig('Betws-y-Coed - Ascott-Under-Wychwood', 'Train towards Betws-y-Coed')).toStrictEqual(expectedResult);
});

test('Test it going wrong', () => {
    const expectedResult = [''];
    expect(getDestOrig('Ascott-Under-Wychwood - Betws-y-Coed', 'Walk to Brighton')).toStrictEqual(expectedResult);
})