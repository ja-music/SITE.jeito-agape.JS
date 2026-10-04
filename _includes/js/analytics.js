// gtag.js entra depois do load e no idle: nada de terceiro antes da pintura. IDs vêm do <html data-*>.
(function () {
  var root = document.documentElement, ga = root.getAttribute('data-ga4'), conv = root.getAttribute('data-ads-conversion') || '';
  if (!ga) return;
  function carregar() {
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga);
    document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', ga);
    if (conv) gtag('config', conv.split('/')[0]);
  }
  function quandoOcioso() { if ('requestIdleCallback' in window) requestIdleCallback(carregar, { timeout: 3000 }); else setTimeout(carregar, 1500); }
  if (document.readyState === 'complete') quandoOcioso(); else window.addEventListener('load', quandoOcioso, { once: true });
})();
