import { useRef } from 'react';
import axios from 'axios';

export default function AddPaper() {
    const name = useRef();
    const cost = useRef();

    const onSubmitPaper = e => {
        e.preventDefault();
        axios.post('/api/paper/create', {
            name: name.current.value,
            cost: cost.current.value
        }).then(res => {
            console.log(res);
        });
        name.current.value = '';
        cost.current.value = '';
    }

    
    return (        
        <form className="row mx-5 glass-morphism p-3" onSubmit={onSubmitPaper}>
            <h2 className="col-12 text-center">Add New Paper</h2>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Name</label>
                <input ref={name} type="text" placeholder="Name" />
            </div>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Cost (£ GBP)</label>
                <input ref={cost} type="number" step="0.01" placeholder="Cost (£ GBP)" />
            </div>

            <button className="btn btn-primary mt-3">Add Paper</button>
        </form>
    );
}