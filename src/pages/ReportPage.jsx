import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReports, addReport } from '../utils/storage';

export default function ReportPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(getReports);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    photo: '',
    location: '',
    features: '',
    contact: '',
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.location || !form.features) {
      alert('목격 위치와 특징은 필수입니다.');
      return;
    }
    addReport(form);
    setReports(getReports());
    setForm({ photo: '', location: '', features: '', contact: '' });
    setShowForm(false);
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 목록으로
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 12px' }}>
        <h2 className="page-title" style={{ padding: 0 }}>유기견 제보</h2>
        <button
          className="btn-register"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '취소' : '제보하기'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>사진 URL</label>
            <input value={form.photo} onChange={set('photo')} placeholder="https://..." />
          </div>
          <div className="field">
            <label>목격 위치 *</label>
            <input value={form.location} onChange={set('location')} placeholder="예: 수원시 영통구 광교호수공원 근처" />
          </div>
          <div className="field">
            <label>특징 *</label>
            <textarea value={form.features} onChange={set('features')} placeholder="색상, 크기, 목줄 유무 등" />
          </div>
          <div className="field">
            <label>연락처</label>
            <input value={form.contact} onChange={set('contact')} placeholder="010-0000-0000" />
          </div>
          <button type="submit" className="btn-submit">제보 등록</button>
        </form>
      )}

      <div className="report-list">
        {reports.length === 0 && (
          <div className="empty-state" style={{ padding: '40px 16px' }}>
            아직 등록된 제보가 없습니다.
          </div>
        )}
        {reports.map((r) => (
          <div className="report-card" key={r.id}>
            {r.photo && <img src={r.photo} alt="제보 사진" className="report-photo" />}
            <div className="report-body">
              <p className="report-location">{r.location}</p>
              <p className="report-features">{r.features}</p>
              {r.contact && <p className="report-contact">{r.contact}</p>}
              <span className="report-date">
                {new Date(r.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
