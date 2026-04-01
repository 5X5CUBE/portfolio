// [1] 헤더 로드 함수
async function loadHeader() {
  try {
    const res = await fetch("header.html"); // 파일 경로가 index.html과 같은 위치에 있으므로 "header.html"
    if (!res.ok) throw new Error('헤더 파일을 찾을 수 없습니다.');
    const data = await res.text();
    document.getElementById("header").innerHTML = data;
    console.log("Header loaded successfully");
    
    // 헤더가 로드된 후에 실행해야 할 로직이 있다면 여기에 추가
  } catch (err) {
    console.error("Header load error:", err);
  }
}

// [2] 커스텀 커서 및 따라다니는 링 로직
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  // 커서 본체 위치
  if(cursor) {
    cursor.style.left = mx - 4 + 'px';
    cursor.style.top  = my - 4 + 'px';
  }
});

function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  if(cursorRing) {
    cursorRing.style.left = rx - 18 + 'px';
    cursorRing.style.top  = ry - 18 + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// [3] 이벤트 위임 (중요: 헤더 안의 링크에도 커서 효과 적용)
document.addEventListener('mouseover', (e) => {
  const target = e.target.closest('a, button, .feature-card, .intro-card, .team-card, .db-card, .role-card');
  if (target && cursorRing) {
    cursorRing.style.width = '60px';
    cursorRing.style.height = '60px';
    cursorRing.style.borderColor = 'rgba(79,110,242,0.6)';
    cursorRing.style.backgroundColor = 'rgba(79,110,242,0.1)';
  }
});

document.addEventListener('mouseout', (e) => {
  const target = e.target.closest('a, button, .feature-card, .intro-card, .team-card, .db-card, .role-card');
  if (target && cursorRing) {
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(79,110,242,0.4)';
    cursorRing.style.backgroundColor = 'transparent';
  }
});

// [4] 스크롤 애니메이션 (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// [5] 함수 실행
loadHeader();

// 전역 함수 등록 (탭 전환용)
window.switchTab = function(btn, id) {
  document.querySelectorAll('.logic-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.logic-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const target = document.getElementById('tab-' + id);
  if(target) target.classList.add('active');
}