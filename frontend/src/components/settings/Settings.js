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
        axios.get("/api/paper")
            .then((res) => {
                setPapers(res.data.map(obj => new Paper(obj._id, obj.name, obj.width, obj.length, obj.cost, obj.description)))
            })
            .catch(error => console.log(error));
    }
    useEffect(() => getPapers(), []);

    const [updatePaper, setUpdatePaper] = useState('please select a paper');
    const [subPages, setSubPages] = useState('default');

    const setOurSubPages = pageName => {
        if (pageName === 'consts') return <Consts />;
        else if (pageName === 'addPaper') return <AddPaper />;
        else if (pageName === 'updatePaper') return <UpdatePaper paper={updatePaper} />
        else if (pageName === 'viewPapers') return <PaperTable papers={papers} updatePaper={(e) => {
            setUpdatePaper(e);
            setSubPages('updatePaper');
        }}/>
        else return <h1 className="glass-morphism mx-5 text-center p-3">Select an option</h1>
    }

    return (
        <>
            <nav className="d-flex glass-morphism justify-content-center mx-5 p-3">
                <button className="btn btn-secondary mx-3" onClick={() => setSubPages('consts')}>Update Ink/P.P</button>
                <button className="btn btn-secondary mx-3" onClick={() => setSubPages('addPaper')}>Add a new Paper</button>
                <button className="btn btn-secondary mx-3" onClick={() => setSubPages('viewPapers')}>View Papers</button>
            </nav>
            {setOurSubPages(subPages)}
        </>
    );
}