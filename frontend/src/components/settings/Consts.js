import { useEffect, useState } from "react"
import axios from 'axios';

export default function Consts() {
    const [consts, setConsts] = useState(null);

    useEffect(() => {
        axios.get("/api/ink")
             .then((res) => {
                 setConsts(res.data);
             })
             .catch(error => console.log(error));
    }, []);

    const updateValues = e => {
        e.preventDefault();
        axios.put('/api/ink/update', consts);
    }

    return (
        <>
            {consts 
            ? <form className="glass-morphism p-5 col-11 d-flex flex-column" onSubmit={updateValues}>
                <h2 className="text-center">Update Constants</h2>

                <label className="mt-3"><strong>Ink Cost (£ GBP)</strong></label>
                <input 
                    type="number" 
                    step="0.01" 
                    value={consts.cost} 
                    onChange={e => setConsts({...consts, cost: e.target.value})} />

                <label className="mt-3"><strong>Ink Tank Volume (ml)</strong></label>
                <input 
                    type="number" 
                    step="0.01" 
                    value={consts.volume} 
                    onChange={e => setConsts({...consts, volume: e.target.value})} />

                <label className="mt-3"><strong>Profit Percentage (%)</strong></label>
                <input 
                    type="number" 
                    step="0.1" 
                    value={consts.profitPercentage} 
                    onChange={e => setConsts({...consts, profitPercentage: e.target.value})} />

                <label className="mt-3"><strong>Ink-Cost Per Unit-Square-Inch</strong></label>
                <input 
                    type="number" 
                    step="0.000001" 
                    value={consts.inkCostPerUnitSquareInch} 
                    onChange={e => setConsts({...consts, inkCostPerUnitSquareInch: e.target.value})} />

                <button className="btn btn-primary mt-3">Update</button>
            </form>
            : <h1 className="glass-morphism">Loading Data</h1>
            }
        </>
    )
}