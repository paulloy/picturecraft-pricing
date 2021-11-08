export default function PaperSelector({ papers, selectedPaper, getSelectedPaper = f => f }) {

    return (
        <div className="col-3-custom p-4 glass-morphism">
            <span className="d-flex justify-content-between align-items-center border-b-double mb-3">
                <h4 className="align-left m-0">Step 2 - Your Paper</h4>
            </span>
            <select 
                className="form-select form-select-lg mb-3" 
                name="paper-selector" 
                id="paper-selector" 
                onChange={(e) => getSelectedPaper(e)}>
                    <option className="d-none" value="not a value">Please select paper</option>
                    {papers.map(paper => (
                        <option value={paper.name}>{paper.name}</option>
                    ))}
            </select>
            <img className="img" src="https://www.blueskyprinting.co.uk/app/uploads/2021/02/giclee-fine-art-print-japan.jpg" alt="temp foto" />
            {/* <p className="p-2 sans-serif-custom">{selectedPaper ? selectedPaper.description : null}</p> */}
        </div>
    );
}