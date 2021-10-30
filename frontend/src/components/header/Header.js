import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="d-flex rounded-0 glass-morphism justify-content-between align-items-center p-3 py-1 mb-4">
      <h1>Picturecraft Printing</h1>
      <nav className="d-flex align-items-center m-0">
        <Link to="" className="mx-4 btn btn-primary">Printing</Link>
        <Link to="settings" className="mx-2 btn btn-secondary"><i class="fas fa-cog"></i> Settings</Link>
      </nav>
    </div>
  );
}
