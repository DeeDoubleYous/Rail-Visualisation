const formatNum = (num: number): string => num < 10 ? `0${num}` : `${num}`;

export const createDateString = (date: Date): string => `${date.getFullYear()}-${formatNum(date.getMonth() + 1)}-${formatNum(date.getDate())}T${date.getHours()}:${date.getMinutes()}:${formatNum(date.getSeconds())}.${date.getMilliseconds()}`;