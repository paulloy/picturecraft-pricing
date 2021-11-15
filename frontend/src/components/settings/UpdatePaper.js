import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function UpdatePaper({ paper }) {
    const name = useRef();
    const cost = useRef();
    
    const [ourPaper, setOurPaper] = useState(paper);
    useEffect(() => setOurPaper(paper), [paper]);

    const onUpdatePaper = e => {
        e.preventDefault();
        axios.put(`/api/paper/${ourPaper._id}`, {
            name: name.current.value,
            cost: Number(cost.current.value)
        });
        name.current.value = '';
        cost.current.value = '';
    }

    
    return (        
        <form className="row flex-column align-items-center mb-5 mx-5 glass-morphism p-3" onSubmit={e => onUpdatePaper(e)}>
            <h2 className="col-12 text-center">Update Paper</h2>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Name</label>
                <input 
                    ref={name} 
                    value={ourPaper.name} 
                    onChange={(e) => setOurPaper({...ourPaper, name: e.target.value})} 
                    type="text"/>
            </div>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Cost (£ GBP)</label>
                <input 
                    ref={cost}  
                    value={ourPaper.cost} 
                    onChange={(e) => setOurPaper({...ourPaper, cost: e.target.value})} 
                    type="number" 
                    step="0.01" 
                    placeholder="Cost (£ GBP)" />
            </div>


            <button className="btn btn-primary mt-3">Update Paper</button>
        </form>
    );
}