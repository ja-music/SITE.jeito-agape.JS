// Medição: cliques de contato (WhatsApp/e-mail) com posição e página, cliques em redes/streaming,
// play nas Sessions, download de wallpaper, chegada na agenda. Enfileira no dataLayer antes do gtag chegar.
(function () {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') window.gtag = function () { window.dataLayer.push(arguments); };
  var conv = document.documentElement.getAttribute('data-ads-conversion') || '';
  var pagina = location.pathname, servico = (document.body.getAttribute('data-page') === 'service') ? pagina.replace(/\//g, '') : '';
  function base(a) {
    return { page_path: pagina, service: a.getAttribute('data-service') || servico || '', cta_location: a.getAttribute('data-track') || '', link_text: (a.textContent || '').trim().slice(0, 80), link_url: a.getAttribute('href') || '' };
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '', p = base(a);
    if (href.indexOf('whatsapp.com') > -1 || href.indexOf('wa.me') > -1) {
      gtag('event', 'whatsapp_click', Object.assign({ event_category: 'contato' }, p));
      if (conv) gtag('event', 'conversion', { send_to: conv });
    } else if (href.indexOf('mailto:') === 0) gtag('event', 'email_click', Object.assign({ event_category: 'contato' }, p));
    else if (href.indexOf('spotify.com') > -1) gtag('event', 'spotify_click', Object.assign({ event_category: 'streaming' }, p));
    else if (href.indexOf('youtube.com') > -1 || href.indexOf('youtu.be') > -1) gtag('event', 'youtube_click', Object.assign({ event_category: 'streaming' }, p));
    else if (href.indexOf('soundcloud.com') > -1 || href.indexOf('deezer.com') > -1 || href.indexOf('music.apple.com') > -1) gtag('event', 'streaming_click', Object.assign({ event_category: 'streaming' }, p));
    else if (href.indexOf('instagram.com') > -1) gtag('event', 'instagram_click', Object.assign({ event_category: 'social' }, p));
    else if (href.indexOf('tiktok.com') > -1) gtag('event', 'tiktok_click', Object.assign({ event_category: 'social' }, p));
    else if (a.hasAttribute('download')) gtag('event', 'wallpaper_download', Object.assign({ event_category: 'conteudo' }, p));
    else if (/^https?:\/\//.test(href) && href.indexOf(location.host) === -1) gtag('event', 'outbound_click', Object.assign({ event_category: 'outbound' }, p));
  });
  // play nas Sessions (botão, não link)
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.session-card[data-yt], .session-card[data-video]');
    if (b) gtag('event', 'sessions_play', { event_category: 'conteudo', video_id: b.getAttribute('data-yt') || b.getAttribute('data-video'), page_path: pagina });
  });
  // chegou na agenda (seção da home ou página)
  var agenda = document.getElementById('agenda');
  if (agenda && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { gtag('event', 'agenda_view', { page_path: pagina }); io.disconnect(); } }); }, { threshold: .4 });
    io.observe(agenda);
  } else if (pagina === '/agenda/') gtag('event', 'agenda_view', { page_path: pagina });
})();
