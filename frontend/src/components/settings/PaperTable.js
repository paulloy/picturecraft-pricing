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
            <div className="glass-morphism col-11 p-3">
                <h2 className="col-11 p-3 mx-auto text-center">Papers</h2>
                <table className="p-3 border border-dark col-11 mx-auto">
                    <thead>
                        <tr>
                            <th className="col-3 p-3 text-center">Name</th>
                            <th className="col-3 p-3 text-center">Cost of a 20" x 16" print (£ GBP)</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {ourPapers.map(paper => (
                            <tr key={paper._id}>
                                <td className="p-3 col-3 text-center">{paper.name}</td>
                                <td className="p-3 col-3 text-center">£{(paper.cost).toFixed(2)}</td>
                                <td className="p-2 col-3 text-center"><button className="btn btn-secondary btn-sm" onClick={() => updatePaper(paper)}>Update</button></td>
                                <td className="col-3 text-center"><button className="btn btn-danger btn-sm" onClick={(e) => deletePaper(e, paper._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}