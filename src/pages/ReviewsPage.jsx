import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReviews, addReview } from '../utils/storage';

export default function ReviewsPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(getReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    dogName: '',
    photo: '',
    content: '',
    author: '',
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.dogName || !form.content || !form.author) {
      alert('강아지 이름, 후기 내용, 닉네임은 필수입니다.');
      return;
    }
    addReview(form);
    setReviews(getReviews());
    setForm({ dogName: '', photo: '', content: '', author: '' });
    setShowForm(false);
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 목록으로
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 12px' }}>
        <h2 className="page-title" style={{ padding: 0 }}>입양 후기</h2>
        <button
          className="btn-register"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '취소' : '후기 작성'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>강아지 이름 *</label>
            <input value={form.dogName} onChange={set('dogName')} placeholder="입양한 강아지 이름" />
          </div>
          <div className="field">
            <label>사진 URL</label>
            <input value={form.photo} onChange={set('photo')} placeholder="https://..." />
          </div>
          <div className="field">
            <label>후기 내용 *</label>
            <textarea value={form.content} onChange={set('content')} placeholder="입양 후기를 작성해주세요" />
          </div>
          <div className="field">
            <label>닉네임 *</label>
            <input value={form.author} onChange={set('author')} placeholder="작성자 닉네임" />
          </div>
          <button type="submit" className="btn-submit">등록하기</button>
        </form>
      )}

      <div className="review-list">
        {reviews.length === 0 && (
          <div className="empty-state" style={{ padding: '40px 16px' }}>
            아직 작성된 후기가 없습니다.
          </div>
        )}
        {reviews.map((r) => (
          <div className="review-card" key={r.id}>
            {r.photo && <img src={r.photo} alt={r.dogName} className="review-photo" />}
            <div className="review-body">
              <div className="review-header">
                <strong>{r.dogName}</strong>
                <span>{r.author}</span>
              </div>
              <p className="review-content">{r.content}</p>
              <span className="review-date">
                {new Date(r.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
