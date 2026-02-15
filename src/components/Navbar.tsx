interface NavbarProps {
  onInfoClick: () => void;
}

export default function Navbar({ onInfoClick }: NavbarProps) {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">Open Running Calculator</h1>
      <button
        type="button"
        className="navbar__info-button"
        onClick={onInfoClick}
      >
        Info
      </button>
    </nav>
  );
}
