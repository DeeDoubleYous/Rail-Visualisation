import { ILocation } from "../../Interfaces";

const workOutLength = (startLoc: ILocation, endLoc: ILocation): number => {
    const x = (endLoc.lng - startLoc.lng);
    const y = (endLoc.lat - startLoc.lat);

    return Math.sqrt((x * x) + (y * y));
}

export const determinZoom = (startLoc: ILocation, endLoc: ILocation): number => {
    const length = workOutLength(startLoc, endLoc);

    if (length > 5) {
        return 5;
    } else if (length <= 5 && length > 3) {
        return 7;
    } else {
        return 10;
    }
}


