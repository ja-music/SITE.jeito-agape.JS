// Revelar ao rolar: o fade-up do AOS (offset 80, uma vez). Sem JS tudo fica visível (CSS só esconde com html.js).
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-visible'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -80px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
