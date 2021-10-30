export default function Header() {
  return (
    <div className="d-flex rounded-0 glass-morphism justify-content-between align-items-center p-3 py-1 mb-4">
      <h1>Picturecraft Printing</h1>
      <ul className="d-flex align-items-center m-0">
        <li className="mx-4 btn btn-primary">Printing</li>
        <li className="mx-2 btn btn-secondary"><i class="fas fa-cog"></i> Settings</li>
      </ul>
    </div>
  );
}
