﻿import { FunctionComponent, ReactElement } from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart, ChartData, Tooltip, Legend } from 'chart.js';

import { ILayerTotals } from '../../Interfaces';

interface ILayerPieChart {
    className: string,
    layerTotals: ILayerTotals[]
}

export const LayerPieChart: FunctionComponent<ILayerPieChart> = (props): ReactElement => {
    Chart.register(ArcElement, Tooltip, Legend);

    const chartData: ChartData<'pie'> = {
        labels: props.layerTotals.map(layer => layer.layerTitle),
        datasets: [{
            data: props.layerTotals.map(layer => layer.uses),
            backgroundColor: props.layerTotals.map(layer => layer.layerColour),
            borderColor: '#000'
        }],
    };

    return (
        <div className={props.className}>
            <Pie
                data={chartData}
                height='50'
                width='50'
                color='#000'
            />
        </div>
    );
}; 