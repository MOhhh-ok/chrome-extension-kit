import { useEffect } from 'react';
import './App.css';
import { testAction } from './actions';

export default function App() {
    useEffect(() => {
        testAction.send(3).then((res) => {
            alert(JSON.stringify(res));
        });
    }, []);
    return 'a';
}