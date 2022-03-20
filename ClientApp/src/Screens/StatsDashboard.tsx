import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { ILayerTotals } from '../Interfaces';
import { LayerPieChart } from '../Components';
import '../Styles/Screens/StatsDashboard.css';

const StatsDashboard: FunctionComponent = (): ReactElement => {
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
                    <LayerPieChart className='pieData' layerTotals={layerTotals} />
            }
        </div>
    );
};

export default StatsDashboard;