import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import healthTips from '../data/healthTips';

const CATEGORIES = ['전체', '장건강', '피부', '식이', '운동'];

export default function TipsPage() {
  const [category, setCategory] = useState('전체');
  const navigate = useNavigate();

  const filtered = category === '전체'
    ? healthTips
    : healthTips.filter((t) => t.category === category);

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 목록으로
      </button>

      <h2 className="page-title">건강 꿀팁</h2>
      <p style={{ padding: '0 16px 12px', fontSize: '0.8rem', color: '#6b7280' }}>
        반려견 건강 관리에 도움이 되는 정보를 모았어요.
      </p>

      <div className="filter-bar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="tips-list">
        {filtered.map((tip) => (
          <div className="tip-card" key={tip.id}>
            <span className="tip-category">{tip.category}</span>
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-content">{tip.content}</p>
            <div className="tip-tags">
              {tip.tags.map((tag) => (
                <span className="tip-tag" key={tag}>#{tag}</span>
              ))}
            </div>

            {tip.category === '장건강' && (
              <div className="tip-cta-group">
                <a
                  href="https://www.snapaw.co.kr/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tip-cta-btn tip-cta-snapaw"
                >
                  Snapaw로 배변 분석하기
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tip-cta-btn tip-cta-pangpang"
                >
                  팡팡펫 유산균 보러가기
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
