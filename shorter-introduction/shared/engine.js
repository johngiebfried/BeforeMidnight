/* Before Midnight intro: shared scroll engine.
   A beat is any element inside a .scene with data-plate="<id>". When it crosses the middle of the window:
     - the .plate with that data-id in the scene's .stage is shown. For a photograph, data-fx / data-fy (percent) say where
       to look and data-fs how far to zoom. For a typed page (.plate.doc), data-focus="<id>" pans the page so the element
       marked data-b="<id>" sits in the middle of the stage.
     - data-yr sets the year in the rail
     - data-blank="n" lights the first n marks of the four-blank tracker and marks blanks 1..n-1 as seen and blank n as current
       in any typed page. Elements outside the draft that carry no data-blank reset the tracker to zero, except inside
       an element marked data-keep.
     - an ancestor with data-night turns the page dark (the last section) and back again.
   Any element with data-hue="<number>" sets the CSS variable --hue while it is in the middle of the window. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var railYr = $('#railYr'), railBar = $('#railBar');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var tick = false;
  function onScroll() {
    if (tick) return; tick = true;
    requestAnimationFrame(function () {
      tick = false;
      var max = Math.max(1, root.scrollHeight - window.innerHeight);
      if (railBar) railBar.style.width = Math.min(100, (window.scrollY / max) * 100) + '%';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { onScroll(); refocus(); });
  onScroll();

  var lastFocus = null;   // { scene, beat } of the last typed-page focus, so a resize can re-center it

  function focusDoc(cur, f, n) {
    var sheet = $('.sheet', cur);
    if (!sheet) return;
    $$('[data-b]', cur).forEach(function (el) {
      var k = parseInt(el.getAttribute('data-b'), 10);
      el.classList.toggle('now', el.getAttribute('data-b') === f);
      if (!isNaN(k)) el.classList.toggle('seen', k < n);
    });
    var y = 0;
    if (f && f !== 'top') {
      var t = $('[data-b="' + f + '"]', cur);
      if (t) y = Math.min(0, Math.round(cur.clientHeight * 0.42 - (t.offsetTop + t.offsetHeight / 2)));
      // never pan past the foot of the page
      y = Math.max(y, Math.min(0, cur.clientHeight - sheet.offsetHeight - 16));
    }
    sheet.style.setProperty('--ty', y + 'px');
  }
  function refocus() {
    if (!lastFocus) return;
    var cur = lastFocus.cur;
    focusDoc(cur, lastFocus.f, lastFocus.n);
  }

  function showPlate(scene, beat) {
    var stage = $('.stage', scene), id = beat.getAttribute('data-plate');
    if (!stage || !id) return;
    var cur = null;
    $$('.plate', stage).forEach(function (p) { if (p.getAttribute('data-id') === id) cur = p; else p.classList.remove('on'); });
    if (!cur) return;
    var f = beat.getAttribute('data-focus');
    if (cur.classList.contains('doc')) {
      var n = parseInt(beat.getAttribute('data-blank') || '0', 10);
      lastFocus = { cur: cur, f: f || 'top', n: n };
      focusDoc(cur, f || 'top', n);
    } else {
      var fx = beat.getAttribute('data-fx') || 50, fy = beat.getAttribute('data-fy') || 50;
      cur.style.objectPosition = fx + '% ' + fy + '%';
      cur.style.transformOrigin = fx + '% ' + fy + '%';
      cur.style.transform = 'scale(' + (beat.getAttribute('data-fs') || 1) + ')';
    }
    cur.classList.add('on');
    var cap = $('.cap', stage);
    if (cap) cap.textContent = cur.getAttribute('data-cap') || '';
  }

  function setBlanks(n) {
    $$('.trk i').forEach(function (i, k) { i.classList.toggle('lit', k < n); });
  }

  function activate(el) {
    var scene = el.closest('.scene');
    if (scene && el.hasAttribute('data-plate')) showPlate(scene, el);
    var yr = el.getAttribute('data-yr');
    if (yr && railYr) railYr.textContent = yr;
    var hueEl = el.closest('[data-hue]');
    if (hueEl) {
      root.style.setProperty('--hue', hueEl.getAttribute('data-hue'));
      root.style.setProperty('--sat', (hueEl.getAttribute('data-sat') || '34') + '%');
    }
    root.classList.toggle('night', !!el.closest('[data-night]'));
    var bl = el.closest('[data-blank]');
    if (bl) setBlanks(parseInt(bl.getAttribute('data-blank'), 10) || 0);
    else if (!el.closest('[data-keep]') && (el.hasAttribute('data-plate') || el.hasAttribute('data-yr'))) setBlanks(0);
  }

  if (!('IntersectionObserver' in window)) { $$('.rv').forEach(function (e) { e.classList.add('in'); }); return; }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) activate(e.target); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  $$('[data-plate], [data-yr], [data-hue], [data-blank], [data-night]').forEach(function (b) { io.observe(b); });
  $$('.scene').forEach(function (scene) { var f = $('[data-plate]', scene); if (f) showPlate(scene, f); });

  var rv = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  $$('.rv').forEach(function (e) { rv.observe(e); });
})();
