import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ChartData, ArcElement, Legend, Tooltip } from 'chart.js';
import '../Styles/Screens/StatsDashboard.css';
import { Layer } from 'maptalks';

interface ILayerTotals {
    layerId: number,
    layerTitle: string,
    layerColour: string,
    uses: number
}

const StatsDashboard: FunctionComponent = (): ReactElement => {
    Chart.register(ArcElement, Legend, Tooltip);
    const [loading, setLoading] = useState<boolean>(true);
    const [layerTotals, setLayerTotals] = useState<ILayerTotals[]>([]);
    const [total, setTotal] = useState<number>(0);

    const fetchData = async () => {
        try {
            const layerData = await (await fetch('/logging')).json();
            const totalData = await (await fetch('/logging/total')).json();

            setLayerTotals(layerData[0]);
            setTotal(totalData[0][0].TotalUse);
        } catch (e) {
            console.error(e);
        }
    };

    const createChartData = (): ChartData<'pie'> => {
        return {
            labels: layerTotals.map(layer => layer.layerTitle),
            datasets: [{
                data: layerTotals.map(layer => layer.uses),
                backgroundColor: layerTotals.map(layer => layer.layerColour),
                borderColor: '#000'
            }],
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (layerTotals.length && total > 0) setLoading(false);
    }, [layerTotals, total]);

    return (
        <div className='Stats'>
            {
                loading ?
                    <p>Loading...</p>
                    :
                    <div className='pieData'>
                        <Pie
                            data={createChartData()}
                            height='50'
                            width='50'
                            color='#000'
                            />
                    </div>
            }
        </div>
    );
};

export default StatsDashboard;