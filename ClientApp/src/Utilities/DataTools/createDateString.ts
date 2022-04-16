const formatNum = (num: number): string => num < 10 ? `0${num}` : `${num}`;

export const createDateString = (date: Date): string => `${date.getFullYear()}-${formatNum(date.getMonth())}-${formatNum(date.getDate())}T${formatNum(date.getHours())}:${formatNum(date.getMinutes())}:${formatNum(date.getSeconds())}.${date.getMilliseconds()}`;