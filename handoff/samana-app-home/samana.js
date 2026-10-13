/* ONE place for the app's address. Change to 'https://app.samana.tech' once sign-in works there. */
var APP = 'https://app.sattvatech.com';
document.querySelectorAll('[data-app]').forEach(function (a) { a.href = APP + (a.getAttribute('data-app') || ''); });
document.getElementById('yr').textContent = new Date().getFullYear();

/* solid top bar once the page scrolls */
var topBar = document.getElementById('top');
function bar() { topBar.classList.toggle('solid', window.scrollY > 24); }
bar(); window.addEventListener('scroll', bar, { passive: true });

/* clips play only while on screen; with motion turned off they stay still and get controls */
var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var clips = document.querySelectorAll('video[data-clip]');
if (still || !('IntersectionObserver' in window)) {
  clips.forEach(function (v) { v.controls = true; });
} else {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.play().catch(function () {}); } else { e.target.pause(); } });
  }, { threshold: 0.3 });
  clips.forEach(function (v) { io.observe(v); });
}
