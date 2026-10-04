// Voltar ao topo: aparece depois de 300 px (como no original).
(function () {
  var btn = document.getElementById('voltar-topo');
  if (!btn) return;
  var ticking = false;
  function checar() { btn.classList.toggle('visible', window.scrollY > 300); ticking = false; }
  window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(checar); ticking = true; } }, { passive: true });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  checar();
})();
