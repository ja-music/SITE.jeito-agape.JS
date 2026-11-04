// Velocidade medida nos aparelhos dos visitantes (Core Web Vitals): LCP, INP e CLS desta página, enviados ao GA4
// uma vez, quando a aba sai de vista. Com ~100 visitas por mês o CrUX do Google não tem dado de campo do site; este é.
// Evento web_vital: metric_name (LCP|INP|CLS), metric_value (ms; CLS sem unidade), metric_rating (good |
// needs-improvement | poor, limites do web.dev), metric_element (tag.classe do elemento), abertura (sim|nao: a página
// abriu com a abertura da home tocando). Em dev não há GA4: os eventos ficam na fila do dataLayer e nada sai.
(function () {
  var P = window.PerformanceObserver, tipos = P && P.supportedEntryTypes;
  if (!tipos) return;
  var m = {}, enviado = false, abertura = document.documentElement.classList.contains('tem-abertura') ? 'sim' : 'nao';
  var limites = { LCP: [2500, 4000], INP: [200, 500], CLS: [0.1, 0.25] };
  function nome(el) {
    if (!el || !el.tagName) return '';
    var c = (el.getAttribute('class') || '').trim().split(/\s+/)[0];
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : c ? '.' + c : '');
  }
  function observar(tipo, fn, extra) {
    if (tipos.indexOf(tipo) < 0) return;
    try { new P(function (l) { l.getEntries().forEach(fn); }).observe(Object.assign({ type: tipo, buffered: true }, extra)); } catch (e) { /* navegador sem suporte */ }
  }
  observar('largest-contentful-paint', function (e) { m.LCP = { v: e.startTime, el: nome(e.element) }; });
  // CLS: a maior janela de deslocamentos (intervalo < 1 s, janela até 5 s), fora os logo depois de um toque.
  var janela = 0, inicio = 0, ultimo = 0;
  observar('layout-shift', function (e) {
    if (e.hadRecentInput) return;
    if (janela && e.startTime - ultimo < 1000 && e.startTime - inicio < 5000) janela += e.value; else { janela = e.value; inicio = e.startTime; }
    ultimo = e.startTime;
    if (!m.CLS || janela > m.CLS.v) m.CLS = { v: janela, el: nome(e.sources && e.sources[0] && e.sources[0].node) };
  });
  // INP: a interação mais lenta da página (com poucas interações por visita, o INP é a pior delas).
  function interacao(e) { if ((e.interactionId || e.entryType === 'first-input') && (!m.INP || e.duration > m.INP.v)) m.INP = { v: e.duration, el: nome(e.target) }; }
  observar('event', interacao, { durationThreshold: 40 });
  observar('first-input', interacao);
  function enviar() {
    if (enviado || typeof window.gtag !== 'function') return;
    enviado = true;
    Object.keys(m).forEach(function (k) {
      var v = m[k].v, r = v <= limites[k][0] ? 'good' : v <= limites[k][1] ? 'needs-improvement' : 'poor';
      gtag('event', 'web_vital', { metric_name: k, metric_value: k === 'CLS' ? Math.round(v * 1000) / 1000 : Math.round(v), metric_rating: r, metric_element: m[k].el, abertura: abertura, page_path: location.pathname, non_interaction: true, transport_type: 'beacon' });
    });
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') enviar(); });
  window.addEventListener('pagehide', enviar);
})();
