// Voltar ao topo: aparece depois de 300 px (como no original).
// No celular, o botão do WhatsApp e o voltar ao topo saem da frente enquanto a pessoa rola para baixo
// (cobriam o texto em 21 de 29 posições do post) e voltam ao rolar para cima; o convite continua no cabeçalho.
(function () {
  var btn = document.getElementById('voltar-topo');
  if (!btn) return;
  var ticking = false, ultimoY = window.scrollY, celular = window.matchMedia('(max-width: 1023px)');
  function checar() {
    var y = window.scrollY;
    btn.classList.toggle('visible', y > 300);
    if (Math.abs(y - ultimoY) > 8) { document.body.classList.toggle('lendo', celular.matches && y > ultimoY && y > 300); ultimoY = y; }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(checar); ticking = true; } }, { passive: true });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  checar();
})();
