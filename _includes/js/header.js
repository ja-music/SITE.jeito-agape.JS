// Header fica mais opaco depois de 50 px rolados (sentinela + IntersectionObserver; sem scroll handler).
(function () {
  var header = document.querySelector('.header'), sent = document.getElementById('topo-sentinela');
  if (!header || !sent || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (es) { header.classList.toggle('scrolled', !es[0].isIntersecting); }).observe(sent);
})();
