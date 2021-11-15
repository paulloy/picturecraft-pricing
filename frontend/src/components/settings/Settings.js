import { useEffect, useState } from 'react';
import PaperTable from './PaperTable';
import AddPaper from './AddPaper';
import UpdatePaper from './UpdatePaper';
import { useDispatch, useSelector } from 'react-redux';
import { getPapers } from '../../actions/papers';

export default function Settings() {
    // Connect to store
    const dispatch = useDispatch();
    const getPapersData = useSelector(state => state.papers.papers);

    // Initialise papers as an empty array
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        dispatch(getPapers());
        setPapers(getPapersData);
    }, []);  

    const [updatePaper, setUpdatePaper] = useState('please select a paper');
    const [subPages, setSubPages] = useState('default');

    const setOurSubPages = pageName => {
        if (pageName === 'addPaper') return <AddPaper />;
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
                <button className="btn btn-secondary mx-3" onClick={() => setSubPages('addPaper')}>Add a new Paper</button>
                <button className="btn btn-secondary mx-3" onClick={() => setSubPages('viewPapers')}>View Papers</button>
            </nav>
            {setOurSubPages(subPages)}
        </>
    );
}