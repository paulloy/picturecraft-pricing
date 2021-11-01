import axios from 'axios';
import { useEffect, useState } from 'react';
import Paper from '../../models/paper.model';
import PaperTable from './PaperTable';
import AddPaper from './AddPaper';
import UpdatePaper from './UpdatePaper';
import Consts from './Consts';

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

    const [updatePaper, setUpdatePaper] = useState('please select a paper');

    return (
        <>
            <Consts />
            <AddPaper />
            <UpdatePaper paper={updatePaper} />
            { 
                !papers.length 
                ? <h1 className="glass-morphism text-center p-3"><i className="fas fa-spinner fa-pulse"></i> Loading</h1> 
                : <PaperTable papers={papers} updatePaper={(e) => setUpdatePaper(e)}/> 
            }
        </>
    );
}