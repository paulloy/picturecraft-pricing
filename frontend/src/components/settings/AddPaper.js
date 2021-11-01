import { useRef } from 'react';
import axios from 'axios';

export default function AddPaper() {
    const name = useRef();
    const width = useRef();
    const length = useRef();
    const cost = useRef();
    const description = useRef();

    const onSubmitPaper = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/paper/create', {
            name: name.current.value,
            width: width.current.value,
            length: length.current.value,
            cost: cost.current.value,
            description: description.current.value
        }).then(res => {
            console.log(res);
        });
        name.current.value = '';
        width.current.value = '';
        length.current.value = '';
        cost.current.value = '';
        description.current.value = '';
    }

    
    return (        
        <form className="row mx-5 glass-morphism p-3" onSubmit={onSubmitPaper}>
            <h2 className="col-12 text-center">Add New Paper</h2>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Name</label>
                <input ref={name} type="text" placeholder="Name" />

                <label className="mt-3">Width (cm)</label>
                <input ref={width} type="number" step="0.01" placeholder="Width (cm)" />

                <label className="mt-3">Length (cm)</label>
                <input ref={length} type="number" step="0.01" placeholder="Length (cm)" />
            </div>

            <div className="col-6 px-5 d-flex flex-column">
                <label className="mt-3">Cost (£ GBP)</label>
                <input ref={cost} type="number" step="0.01" placeholder="Cost (£ GBP)" />

                <label className="mt-3">Description</label>
                <textarea ref={description} cols="30" rows="10">Description</textarea>
            </div>


            <button className="btn btn-primary mt-3">Add Paper</button>
        </form>
    );
}