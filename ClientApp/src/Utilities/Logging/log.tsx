export const log = async (data: any): Promise<boolean> => {
    const request = await fetch('/logging', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": 'application/json'
        }
    });

    return request.ok;
}