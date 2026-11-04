// Abertura da home (o refrão de "Aliança"): a linha do tempo é CSS; aqui só o que precisa de JS —
// pular (botão, toque na tela ou Esc), travar a rolagem enquanto toca, pausar com a aba escondida,
// tirar do documento no fim e contar no GA4 se foi vista inteira ou pulada (e em que segundo).
// Primeiro arquivo do main.js e todo em try/catch: um erro aqui não pode derrubar os outros.
(function () {
  try {
    var ab = document.getElementById('abertura'), html = document.documentElement;
    if (!ab) return;
    if (!html.classList.contains('tem-abertura')) { ab.remove(); return; }
    var inicio = Date.now(), fim = false;
    html.classList.add('abertura-trava');
    function trava(e) { e.preventDefault(); }
    ab.addEventListener('wheel', trava, { passive: false });
    ab.addEventListener('touchmove', trava, { passive: false });
    function limpa(acao) {
      if (fim) return; fim = true;
      html.classList.remove('tem-abertura', 'abertura-trava');
      document.removeEventListener('keydown', tecla);
      ab.remove();
      if (typeof window.gtag === 'function') gtag('event', 'abertura', { event_category: 'conteudo', acao: acao, segundos: Math.round((Date.now() - inicio) / 100) / 10, page_path: location.pathname });
    }
    function pular() { if (!ab.classList.contains('abertura--sair')) ab.classList.add('abertura--sair'); }
    function tecla(e) { if (e.key === 'Escape') { e.preventDefault(); pular(); } }
    ab.addEventListener('click', pular);
    document.addEventListener('keydown', tecla);
    ab.addEventListener('animationend', function (e) { if (e.target === ab) limpa(e.animationName === 'ab-sai-ja' ? 'pulada' : 'completa'); });
    function visivel() { ab.classList.toggle('abertura--pausa', document.hidden); }
    document.addEventListener('visibilitychange', visivel);
    visivel();
    setTimeout(function () { limpa('tempo'); }, 30000); // rede de segurança: nunca prende a página
  } catch (e) { /* a cortina sobe sozinha pelo CSS */ }
})();
