export const getDestFromHtml = (htmlInst: string) => htmlInst.includes('Train towards') && htmlInst.slice(14);

export const getDestOrig = (name: string, htmlInst: string) => {
    const dest = getDestFromHtml(htmlInst);
    if(typeof dest === 'boolean'){
        return [''];
    }

    const [first, second] = name.split(' - ');

    return dest === first ? [second, first] : [first, second];
};