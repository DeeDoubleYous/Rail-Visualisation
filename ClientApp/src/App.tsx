import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import './custom.css'

interface TestData {
    name?: string,
    description?: string
}


const test = async () => {
    const response = await fetch('test');
    const data = await response.json();
    return data;
}

const App: FunctionComponent = (): ReactElement => {

    const [testData, setTestData] = useState<TestData[]>([]);

    useEffect(() => {
        fetch('test').then(response => response.json().then((data: TestData[]) => setTestData(data)));
    }, []);

    return (
        <div>
            {
                testData.map(item => {
                    return (
                        <div>
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}


export default App;