/* ONE place for the app's address. Change to 'https://app.samana.tech' once sign-in works there. */
var APP = 'https://app.samana.tech';
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

/* the opening tour: the label above it follows the screen on show */
var tour = document.getElementById('tour'), tourLabel = document.getElementById('tour-label');
if (tour && tourLabel) {
  var marks = [[0, "Takeoff · tabbing the levels"], [1.99, "Takeoff · the drawing set, layer by layer"], [4.1, "Takeoff · up into 3D"], [5.85, "Takeoff · 3D, finished or framing"], [7.6, "Takeoff · the customer packet"], [9.7, "Revisions · Rev A against Rev B"], [11.57, "Team portal · the crew's work order"], [13.32, "Flow · the dashboard"], [15.54, "Flow · every dollar by cost code"], [17.64, "Lean · steps on the calendar"], [19.74, "Lean · team hours by week"], [21.73, "Lean · planned rate against actual"], [23.71, "Lean · what to order, and when"], [25.46, "Farmmetric portal · the crew's day"]];
  tour.addEventListener('timeupdate', function () {
    var t = tour.currentTime, m = marks[0][1];
    for (var i = 0; i < marks.length; i++) if (t >= marks[i][0]) m = marks[i][1];
    var txt = 'Samana · ' + m;
    if (tourLabel.textContent !== txt) tourLabel.textContent = txt;
  });
}

/* Contact us: sent through Formspree. ONE place for the form address. */
var CONTACT_FORM = 'https://formspree.io/f/mbdpkqyj';
var cf = document.getElementById('contact-form');
if (cf) cf.addEventListener('submit', function (e) {
  e.preventDefault();
  var msg = cf.querySelector('.cform-msg'), btn = cf.querySelector('button');
  btn.disabled = true; msg.className = 'cform-msg'; msg.textContent = 'Sending...';
  fetch(CONTACT_FORM, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(cf) })
    .then(function (r) {
      if (!r.ok) throw new Error();
      cf.reset(); msg.className = 'cform-msg ok'; msg.textContent = 'Sent. Thank you, we will get back to you.';
    })
    .catch(function () { msg.className = 'cform-msg err'; msg.textContent = 'That did not send. Please email info@samana.tech.'; })
    .then(function () { btn.disabled = false; });
});
