export const stripHTML = (text: string) => {
    const regex = /[<][^>]+[>]/ig;
    return text.replaceAll(regex, '');
};