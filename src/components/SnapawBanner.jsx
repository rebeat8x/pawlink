export default function SnapawBanner({ variant = 'inline' }) {
  return (
    <div className={`snapaw-banner ${variant === 'detail' ? 'snapaw-detail' : 'snapaw-inline'}`}>
      <p className="snapaw-title">사진 한 장으로 장 건강 체크</p>
      <p className="snapaw-subtitle">AI 분석을 통해 우리 아이에게 지금 필요한 케어를 알려드려요</p>
      <a
        href="https://www.snapaw.co.kr/login"
        target="_blank"
        rel="noopener noreferrer"
        className="snapaw-btn"
      >
        Snapaw로 확인하기
      </a>
    </div>
  );
}
