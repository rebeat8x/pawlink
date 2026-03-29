import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenges, addChallenge } from '../utils/storage';

export default function ChallengePage() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState(getChallenges);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    dogName: '',
    shelter: '',
    photo: '',
    message: '',
    author: '',
  });

  const set = (key) => (e) => {
    const val = e.target.value;
    if (key === 'message' && val.length > 100) return;
    setForm({ ...form, [key]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.dogName || !form.message || !form.author) {
      alert('강아지 이름, 한마디, 닉네임은 필수입니다.');
      return;
    }
    addChallenge(form);
    setChallenges(getChallenges());
    setForm({ dogName: '', shelter: '', photo: '', message: '', author: '' });
    setShowForm(false);
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 목록으로
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 12px' }}>
        <h2 className="page-title" style={{ padding: 0 }}>입양 챌린지</h2>
        <button
          className="btn-register"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '취소' : '나도 참여하기'}
        </button>
      </div>

      <p style={{ padding: '0 16px 16px', fontSize: '0.8rem', color: '#6b7280' }}>
        우리 가족이 됐어요! 입양 후 행복한 순간을 공유해주세요.
      </p>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>강아지 이름 *</label>
            <input value={form.dogName} onChange={set('dogName')} placeholder="입양한 강아지 이름" />
          </div>
          <div className="field">
            <label>입양 전 보호소명</label>
            <input value={form.shelter} onChange={set('shelter')} placeholder="예: 수원시 동물보호센터" />
          </div>
          <div className="field">
            <label>현재 사진 URL</label>
            <input value={form.photo} onChange={set('photo')} placeholder="https://..." />
          </div>
          <div className="field">
            <label>한마디 * ({form.message.length}/100)</label>
            <textarea
              value={form.message}
              onChange={set('message')}
              placeholder="입양 후 행복한 한마디를 남겨주세요"
              style={{ minHeight: 60 }}
            />
          </div>
          <div className="field">
            <label>닉네임 *</label>
            <input value={form.author} onChange={set('author')} placeholder="작성자 닉네임" />
          </div>
          <button type="submit" className="btn-submit">챌린지 등록</button>
        </form>
      )}

      <div className="challenge-grid">
        {challenges.length === 0 && (
          <div className="empty-state">
            아직 챌린지 참여자가 없습니다. 첫 번째 참여자가 되어주세요!
          </div>
        )}
        {challenges.map((c) => (
          <div className="challenge-card" key={c.id}>
            <div className="challenge-heart-bg">♥</div>
            <div className="challenge-content">
              {c.photo && <img src={c.photo} alt={c.dogName} className="challenge-photo" />}
              <div className="challenge-info">
                <strong className="challenge-dog-name">{c.dogName}</strong>
                <p className="challenge-message">"{c.message}"</p>
                <div className="challenge-meta">
                  <span>{c.author}</span>
                  {c.shelter && <span>· {c.shelter}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
