export const stripStation = (station: string) => station.split('Station')[0].trim();

export const getPostCode = (address: string): string => {
    let postCode = '';
    const matchArray = address.split(',').map(item => item.match(/([A-Za-z]{1,2}\d{1,2})(\s?(\d?\w{2}))?/)).filter(e => e)[0];

    if(matchArray){
        postCode = matchArray[0];
    }

    return postCode;
};