import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          PawLink
        </Link>
        <nav className="header-menu">
          <Link to="/tips">건강정보</Link>
          <Link to="/reviews">후기</Link>
          <Link to="/challenge">챌린지</Link>
          <a href="https://pangpangpet.com" target="_blank" rel="noopener noreferrer" className="header-cta">
            팡팡펫 ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
