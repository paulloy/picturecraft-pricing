import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function UpdatePaper({ paper }) {
    const name = useRef();
    const width = useRef();
    const length = useRef();
    const cost = useRef();
    const description = useRef();

    
    const [ourPaper, setOurPaper] = useState(paper);
    useEffect(() => setOurPaper(paper), [paper]);

    const onUpdatePaper = e => {
        e.preventDefault();
        axios.put(`/api/paper/${ourPaper.id}`, {
            name: name.current.value,
            width: width.current.value,
            length: length.current.value,
            cost: cost.current.value,
            description: description.current.value
        });
        name.current.value = '';
        width.current.value = '';
        length.current.value = '';
        cost.current.value = '';
        description.current.value = '';
    }

    
    return (        
        <form className="row mx-5 glass-morphism p-3" onSubmit={e => onUpdatePaper(e)}>
            <h2 className="col-12 text-center">Update Paper</h2>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Name</label>
                <input 
                    ref={name} 
                    value={ourPaper.name} 
                    onChange={(e) => setOurPaper({...ourPaper, name: e.target.value})} 
                    type="text"/>

                <label className="mt-3">Width (cm)</label>
                <input 
                    ref={width} 
                    value={ourPaper.width} 
                    onChange={(e) => setOurPaper({...ourPaper, width: e.target.value})} 
                    type="number" 
                    step="0.01" 
                    placeholder="Width (cm)" />

                <label className="mt-3">Length (cm)</label>
                <input 
                    ref={length}  
                    value={ourPaper.length} 
                    onChange={(e) => setOurPaper({...ourPaper, length: e.target.value})} 
                    type="number" 
                    step="0.01" 
                    placeholder="Length (cm)" />
            </div>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Cost (£ GBP)</label>
                <input 
                    ref={cost}  
                    value={ourPaper.rollCost} 
                    onChange={(e) => setOurPaper({...ourPaper, rollCost: e.target.value})} 
                    type="number" 
                    step="0.01" 
                    placeholder="Cost (£ GBP)" />

                <label className="mt-3">Description</label>
                <textarea  
                    ref={description}
                    value={ourPaper.description} 
                    onChange={(e) => setOurPaper({...ourPaper, description: e.target.value})} 
                    cols="30" 
                    rows="10"></textarea>
            </div>


            <button className="btn btn-primary mt-3">Update Paper</button>
        </form>
    );
}