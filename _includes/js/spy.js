// Na home, o link do menu da seção visível fica ativo (como o scroll-spy original).
(function () {
  if (document.body.getAttribute('data-page') !== 'home') return;
  var secoes = document.querySelectorAll('main section[id]'), links = document.querySelectorAll('.nav-link[href^="/#"]');
  if (!secoes.length || !links.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return;
      links.forEach(function (a) {
        var ativo = a.getAttribute('href') === '/#' + en.target.id;
        a.classList.toggle('active', ativo);
        if (ativo) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  secoes.forEach(function (s) { io.observe(s); });
})();
