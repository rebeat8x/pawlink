import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <h1>PawLink</h1>
      </Link>
      <nav className="header-nav">
        <Link to="/tips" className="header-nav-link">건강정보</Link>
        <Link to="/reviews" className="header-nav-link">후기</Link>
        <Link to="/challenge" className="header-nav-link">챌린지</Link>
        <a href="https://pangpangpet.com" target="_blank" rel="noopener noreferrer" className="header-link">팡팡펫</a>
      </nav>
    </header>
  );
}
