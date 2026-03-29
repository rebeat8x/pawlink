export default function SnapawBanner({ variant = 'inline' }) {
  return (
    <div className={`snapaw-banner ${variant === 'detail' ? 'snapaw-detail' : 'snapaw-inline'}`}>
      <p>우리 강아지 장건강 괜찮을까요?</p>
      <a
        href="https://snapaw.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className="snapaw-btn"
      >
        Snapaw로 확인하기
      </a>
    </div>
  );
}
