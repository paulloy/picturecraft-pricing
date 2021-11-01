import axios from "axios";
import { useState } from 'react';
import UpdatePaper from "./UpdatePaper";

export default function PaperTable({ papers, updatePaper = f => f }) {
    const deletePaper = (e, paperId) => {
        e.preventDefault()
        axios.delete(`http://localhost:4000/api/paper/delete/${paperId}`);
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
                        <th className="p-3 text-center">Name</th>
                        <th className="p-3 text-center">Width (cm)</th>
                        <th className="p-3 text-center">Length (cm)</th>
                        <th className="p-3 text-center">Cost (£ GBP)</th>
                        <th className="p-3 text-center">Description</th>
                        <th className="bg-dark"></th>
                        <th className="bg-dark"></th>
                    </tr>
                </thead>
                <tbody>
                    {ourPapers.map(paper => (
                        <tr>
                            <td className="p-3 text-center">{paper.name}</td>
                            <td className="p-3 text-center">{paper.width}cm</td>
                            <td className="p-3 text-center">{paper.length}cm</td>
                            <td className="p-3 text-center">£{paper.rollCost.toFixed(2)}</td>
                            <td className="p-3 text-center">{paper.description}</td>
                            <td className="p-2 text-center"><button className="btn btn-secondary" onClick={() => updatePaper(paper)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={(e) => deletePaper(e, paper.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}