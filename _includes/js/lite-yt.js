// Player só entra no clique. Com data-video toca o MP4 do R2 no <video> nativo (o embed do YouTube
// bloqueia covers com reivindicação de direitos fora do youtube.com); sem ele, cai no youtube-nocookie.
// O cartão é um <button>: Enter e espaço já funcionam.
(function () {
  document.querySelectorAll('.session-card[data-yt], .session-card[data-video]').forEach(function (card) {
    card.addEventListener('click', function () {
      if (card.getAttribute('data-tocando')) return;
      card.setAttribute('data-tocando', '1');
      var titulo = card.getAttribute('aria-label') || 'Vídeo';
      var mp4 = card.getAttribute('data-video'), id = card.getAttribute('data-yt');
      if (mp4) {
        var img = card.querySelector('img');
        var v = document.createElement('video');
        v.src = mp4; v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto';
        if (img && img.currentSrc) v.poster = img.currentSrc;
        v.setAttribute('aria-label', titulo);
        card.replaceChildren(v);
        var p = v.play(); if (p && p.catch) p.catch(function () {});
        return;
      }
      if (!id) return;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      f.title = titulo;
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      f.setAttribute('allowfullscreen', '');
      card.replaceChildren(f);
    }, { once: true });
  });
})();
