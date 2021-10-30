import axios from 'axios';
import { useEffect, useState } from 'react';
import Paper from '../../models/paper.model';
import PaperTable from './PaperTable';

export default function Settings() {

    const [papers, setPapers] = useState([]);

    const getPapers = () => {
        axios.get("http://localhost:4000/api/paper")
            .then((res) => {
                setPapers(res.data.map(obj => new Paper(obj._id, obj.name, obj.width, obj.length, obj.cost, obj.description)))
            })
            .catch(error => console.log(error));
    }
    useEffect(() => getPapers(), []);

    return (
        <>
            <PaperTable papers={papers}/>
        </>
    );
}