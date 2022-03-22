import { FunctionComponent, ReactElement } from 'react';
import { ILayerTotals } from '../../Interfaces';

interface ILayerBreakDown {
    className: string,
    layerTotals: ILayerTotals[],
    total: number
}

export const LayerBreakDown: FunctionComponent<ILayerBreakDown> = (props): ReactElement => {
    return (
        <div className={props.className}>
            {
                props.layerTotals.map(layer =>
                    <div key={`${layer.layerId}`} className='layerTotal'>
                        {`Layer Title: ${layer.layerTitle} Uses: ${layer.uses} Out of Total: ${Math.round((layer.uses / props.total) * 100)}%`}
                    </div>   
                )
            }
        </div>
     );
}