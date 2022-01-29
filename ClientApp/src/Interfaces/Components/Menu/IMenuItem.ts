import { ILayer } from '../../';

export interface IMenuItem extends ILayer{
    itemTitle: string,
    primaryAction?: () => void,
    secondaryAction?:() => void,
}