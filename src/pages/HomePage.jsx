import { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDogs, getFavorites, toggleFavorite, getChallenges } from '../utils/storage';
import Toast from '../components/Toast';
import SnapawBanner from '../components/SnapawBanner';

const FILTERS = ['전체', '보호중', '실종', '긴급', '제보', '찜'];

const statusBadgeClass = {
  보호중: 'badge badge-보호중',
  실종: 'badge badge-실종',
  긴급: 'badge badge-긴급',
};

export default function HomePage() {
  const [filter, setFilter] = useState('전체');
  const [favs, setFavs] = useState(getFavorites);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const dogs = getDogs();

  const filtered = useMemo(() => {
    if (filter === '전체') return dogs;
    if (filter === '찜') return dogs.filter((d) => favs.includes(d.id));
    return dogs.filter((d) => d.status === filter);
  }, [dogs, filter, favs]);

  const handleFav = useCallback((e, dogId) => {
    e.stopPropagation();
    const updated = toggleFavorite(dogId);
    setFavs([...updated]);
  }, []);

  const handleShare = useCallback((e, dog) => {
    e.stopPropagation();
    const url = `${window.location.origin}/dog/${dog.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setToast('링크가 복사되었습니다');
    });
  }, []);

  // Stats
  const sheltering = dogs.length;
  const thisMonth = 0;
  const shelters = new Set(dogs.map((d) => d.shelter)).size;
  const challengeCount = getChallenges().length;

  // Insert Snapaw banner after 2nd card
  const renderCards = () => {
    const items = [];
    filtered.forEach((dog, i) => {
      items.push(
        <div
          className="card"
          key={dog.id}
          onClick={() => navigate(`/dog/${dog.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-img-wrap">
            {dog.photo ? (
              <img src={dog.photo} alt={dog.name} loading="lazy" />
            ) : (
              <div className="card-placeholder">
                {dog.breed?.[0] || '?'}
              </div>
            )}
            <span className={statusBadgeClass[dog.status]}>{dog.status}</span>
            <button
              className={`heart-btn ${favs.includes(dog.id) ? 'hearted' : ''}`}
              onClick={(e) => handleFav(e, dog.id)}
              aria-label="찜하기"
            >
              {favs.includes(dog.id) ? '♥' : '♡'}
            </button>
          </div>
          <div className="card-body">
            <h3>{dog.name}</h3>
            <p className="card-meta">
              {dog.breed} · {dog.age}
            </p>
            <p className="card-shelter">{dog.shelter}</p>
            <div className="card-actions">
              <a
                href={`tel:${dog.contact}`}
                className="btn-inquiry"
                onClick={(e) => e.stopPropagation()}
              >
                입양 문의
              </a>
              <button
                className="btn-share"
                onClick={(e) => handleShare(e, dog)}
                aria-label="공유하기"
              >
                ↗
              </button>
            </div>
          </div>
        </div>
      );

      // Insert banners after 2nd card
      if (i === 1) {
        items.push(
          <div className="card-grid-banner" key="snapaw-banner">
            <SnapawBanner />
          </div>
        );
        items.push(
          <div className="card-grid-banner" key="pangpang-banner">
            <div className="pangpang-banner">
              <p className="pangpang-text">장건강 걱정된다면? 레반 유산균으로 시작하세요</p>
              <a href="https://pangpangpet.com" target="_blank" rel="noopener noreferrer" className="pangpang-btn">
                팡팡펫 보러가기
              </a>
            </div>
          </div>
        );
      }
    });
    return items;
  };

  return (
    <>
      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <strong>{sheltering}</strong>보호 중
        </div>
        <div className="stat-item">
          <strong>{thisMonth}</strong>이번 달 입양
        </div>
        <div className="stat-item">
          <strong>{shelters}</strong>협력 보호소
        </div>
        <div className="stat-item">
          <strong>{challengeCount}</strong>챌린지 참여
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? 'active' : ''}`}
            onClick={() => {
              if (f === '제보') {
                navigate('/report');
                return;
              }
              setFilter(f);
            }}
          >
            {f === '실종' ? '실종신고' : f === '찜' ? '찜한 강아지' : f}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {filtered.length === 0 && (
          <div className="empty-state">
            {filter === '찜' ? '찜한 강아지가 없습니다.' : '등록된 유기견이 없습니다.'}
          </div>
        )}
        {renderCards()}
      </div>

      {/* Challenge Banner */}
      <div className="challenge-banner">
        <span>입양했다면 챌린지에 참여해주세요!</span>
        <Link to="/challenge" className="challenge-banner-btn">참여하기</Link>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">
        <span>보호소 운영자이신가요?</span>
        <Link to="/register" className="btn-register">
          등록하기
        </Link>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
