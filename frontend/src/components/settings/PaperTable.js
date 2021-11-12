import axios from "axios";
import { useState } from 'react';

export default function PaperTable({ papers, updatePaper = f => f }) {
    const deletePaper = (e, paperId) => {
        e.preventDefault()
        axios.delete(`/api/paper/delete/${paperId}`);
        const refreshPapers = ourPapers.filter(paper => paper.id !== paperId);
        setOurPapers(refreshPapers);
    }

    const [ourPapers, setOurPapers] = useState(papers);

    return (
        <>
            <h2 className="glass-morphism col-11 p-3 text-center">Papers</h2>
            <table className="glass-morphism p-3 col-11">
                <thead>
                    <tr>
                        <th className="col-3 p-3 text-center">Name</th>
                        <th className="col-3 p-3 text-center">Cost of a 20" x 16" print (£ GBP)</th>
                        <th className="col-3 bg-dark"></th>
                        <th className="col-3 bg-dark"></th>
                    </tr>
                </thead>
                <tbody>
                    {ourPapers.map(paper => (
                        <tr>
                            <td className="p-3 col-3 text-center">{paper.name}</td>
                            <td className="p-3 col-3 text-center">£{(paper.cost).toFixed(2)}</td>
                            <td className="p-2 col-3 text-center"><button className="btn btn-secondary" onClick={() => updatePaper(paper)}>Update</button></td>
                            <td className="col-3 text-center"><button className="btn btn-danger" onClick={(e) => deletePaper(e, paper._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}