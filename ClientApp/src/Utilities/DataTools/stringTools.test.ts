import { createDateString } from "./createDateString";
import { stripHTML } from "./stripHTML";

const testDataOne = ['Turn \u003cb\u003eright\u003c/b\u003e to stay on \u003cb\u003eMount Stuart Square\u003c/b\u003e', 'Turn right to stay on Mount Stuart Square'];

test('HTML stripping', () => {
    expect(stripHTML(testDataOne[0])).toBe(testDataOne[1]);
    expect(stripHTML('Walk to London Euston')).toBe('Walk to London Euston');
});


test('Create Date String', () =>{
    expect(createDateString(new Date(2000, 7, 26))).toBe('2000-07-26T00:00:00.0');
});