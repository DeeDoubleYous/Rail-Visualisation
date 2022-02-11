export interface ILine {
    agencies: {
        name: string,
        phone: string,
        url: string
    }[],
    color: string,
    name: string,
    short_name: string,
    text_color: string,
    vehicle: {
        icon: string,
        local_icon: string,
        name: string,
        type: string
    }
}