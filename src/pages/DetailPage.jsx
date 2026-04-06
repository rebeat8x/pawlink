import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDogById, toggleFavorite, isFavorite } from '../utils/storage';
import SnapawBanner from '../components/SnapawBanner';
import Toast from '../components/Toast';

const statusColor = {
  보호중: 'var(--primary)',
  실종: 'var(--orange)',
  긴급: 'var(--red)',
};

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dog = getDogById(id);
  const [fav, setFav] = useState(() => isFavorite(id));
  const [toast, setToast] = useState(null);

  const handleFav = useCallback(() => {
    toggleFavorite(id);
    setFav((v) => !v);
  }, [id]);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/dog/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setToast('링크가 복사되었습니다');
    });
  }, [id]);

  if (!dog) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <p>해당 유기견 정보를 찾을 수 없습니다.</p>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← 목록으로
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="detail-top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← 목록으로
        </button>
        <div className="detail-top-actions">
          <button
            className={`heart-btn-detail ${fav ? 'hearted' : ''}`}
            onClick={handleFav}
          >
            {fav ? '♥' : '♡'}
          </button>
          <button className="share-btn-detail" onClick={handleShare}>
            ↗
          </button>
        </div>
      </div>

      {dog.photo ? (
        <img className="detail-photo" src={dog.photo} alt={dog.name} />
      ) : (
        <div className="detail-photo-placeholder">{dog.breed?.[0] || '?'}</div>
      )}

      <div className="detail-body">
        <span
          className="detail-status"
          style={{ background: statusColor[dog.status] }}
        >
          {dog.status}
        </span>

        <h2>{dog.name}</h2>
        <p className="detail-breed">{dog.breed}</p>

        <div className="detail-info">
          <dl className="detail-info-item">
            <dt>나이</dt>
            <dd>{dog.age || '-'}</dd>
          </dl>
          <dl className="detail-info-item">
            <dt>성별</dt>
            <dd>{dog.gender === '수' ? '남아' : '여아'}{dog.neutered != null ? (dog.neutered ? ' (중성화O)' : ' (중성화X)') : ''}</dd>
          </dl>
          <dl className="detail-info-item">
            <dt>크기</dt>
            <dd>{{ 소: '소형', 중: '중형', 대: '대형' }[dog.size] || dog.size}</dd>
          </dl>
          <dl className="detail-info-item">
            <dt>보호소</dt>
            <dd>{dog.shelter}</dd>
          </dl>
        </div>

        {dog.note && (
          <div className="detail-note">
            <strong>특이사항</strong>
            {dog.note}
          </div>
        )}

        <a href={`tel:${dog.contact}`} className="btn-contact">
          입양 문의하기 ({dog.contact})
        </a>

        <SnapawBanner variant="detail" />

        {/* 웰컴 키트 배너 */}
        <div className="welcome-kit-banner">
          <p className="welcome-kit-text">입양 확정 시 팡팡펫 웰컴 키트 100% 증정</p>
          <a
            href="https://pangpangpet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="welcome-kit-btn"
          >
            자세히 보기
          </a>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
