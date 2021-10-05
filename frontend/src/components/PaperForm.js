import React, { useRef } from "react"
import axios from 'axios';

function PaperForm() {
    const paperName = useRef();
    const paperLength = useRef();
    const paperWidth = useRef();
    const paperCost = useRef();

    const handleSubmit = e => {
        e.preventDefault();

        let postData = {
            name: paperName.current.value.toString(),
            length: parseFloat(paperLength.current.value),
            width: parseFloat(paperWidth.current.value),
            cost: parseFloat(paperCost.current.value), 
        }

        axios.post('http://localhost:4000/api/paper/create', postData)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error.response.data);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input ref={paperName} type="text" placeholder="name" />
            <input ref={paperLength} type="number" placeholder="length (cm)" name="length"/>
            <input ref={paperWidth} type="number" placeholder="width (cm)" name="width"/>
            <input ref={paperCost} type="number" placeholder="Cost (£)" name="cost"/>
            <button type="submit">Add new Paper</button>
        </form>  
    );
}



  export default PaperForm;