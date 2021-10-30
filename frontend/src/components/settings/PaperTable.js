export default function PaperTable({ papers }) {
    return (
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
                {papers.map(paper => (
                    <tr>
                        <td className="p-3 text-center">{paper.name}</td>
                        <td className="p-3 text-center">{paper.width}cm</td>
                        <td className="p-3 text-center">{paper.length}cm</td>
                        <td className="p-3 text-center">£{paper.rollCost.toFixed(2)}</td>
                        <td className="p-3 text-center">{paper.description}</td>
                        <td className="p-2 text-center"><button className="btn btn-secondary">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}