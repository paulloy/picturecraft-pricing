export default function AddPaper() {
    return (        
        <form className="col-11 d-flex flex-column glass-morphism p-3">
            <h2>Add New Paper</h2>

            <label className="mt-3">Name</label>
            <input type="text" placeholder="Name" />

            <label className="mt-3">Width (cm)</label>
            <input type="number" step="0.01" placeholder="Width (cm)" />

            <label className="mt-3">Length (cm)</label>
            <input type="number" step="0.01" placeholder="Length (cm)" />

            <label className="mt-3">Cost (£ GBP)</label>
            <input type="number" step="0.01" placeholder="Cost (£ GBP)" />

            <label className="mt-3">Description</label>
            <textarea cols="30" rows="10">Description</textarea>

            <button className="btn btn-primary">Add Paper</button>
        </form>
    );
}