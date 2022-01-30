import { ILayer } from '../../';

export interface IMenuItem{
    className: string, 
    itemTitle: string,
    primaryAction?: () => void,
    secondaryAction?:() => void,
}