import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDog } from '../utils/storage';

const INITIAL = {
  name: '',
  breed: '',
  age: '',
  gender: '수',
  size: '중',
  status: '보호중',
  shelter: '',
  contact: '',
  note: '',
  photo: '',
};

export default function RegisterPage() {
  const [form, setForm] = useState(INITIAL);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.breed || !form.shelter || !form.contact) {
      alert('이름, 품종, 보호소명, 연락처는 필수 항목입니다.');
      return;
    }
    addDog(form);
    navigate('/');
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← 목록으로
      </button>
      <h2 className="page-title">유기견 등록</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>이름 *</label>
          <input value={form.name} onChange={set('name')} placeholder="예: 초코" />
        </div>

        <div className="field-row">
          <div className="field">
            <label>품종 *</label>
            <input value={form.breed} onChange={set('breed')} placeholder="예: 믹스견" />
          </div>
          <div className="field">
            <label>나이</label>
            <input value={form.age} onChange={set('age')} placeholder="예: 2살 추정" />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>성별</label>
            <select value={form.gender} onChange={set('gender')}>
              <option value="수">수컷</option>
              <option value="암">암컷</option>
            </select>
          </div>
          <div className="field">
            <label>크기</label>
            <select value={form.size} onChange={set('size')}>
              <option value="소">소형</option>
              <option value="중">중형</option>
              <option value="대">대형</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>상태</label>
          <select value={form.status} onChange={set('status')}>
            <option value="보호중">보호중</option>
            <option value="실종">실종신고</option>
            <option value="긴급">긴급</option>
          </select>
        </div>

        <div className="field">
          <label>보호소명 *</label>
          <input value={form.shelter} onChange={set('shelter')} placeholder="예: 수원시 동물보호센터" />
        </div>

        <div className="field">
          <label>연락처 *</label>
          <input value={form.contact} onChange={set('contact')} placeholder="예: 031-228-3000" />
        </div>

        <div className="field">
          <label>특이사항</label>
          <textarea value={form.note} onChange={set('note')} placeholder="건강 상태, 성격 등" />
        </div>

        <div className="field">
          <label>사진 URL</label>
          <input value={form.photo} onChange={set('photo')} placeholder="https://..." />
        </div>

        <button type="submit" className="btn-submit">
          등록하기
        </button>
      </form>
    </>
  );
}
