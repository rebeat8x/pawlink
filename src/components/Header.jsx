import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <h1>PawLink</h1>
        <span>by PangpangPet</span>
      </Link>
      <nav className="header-nav">
        <Link to="/reviews" className="header-nav-link">후기</Link>
        <a href="#" className="header-link">팡팡펫 바로가기</a>
      </nav>
    </header>
  );
}
