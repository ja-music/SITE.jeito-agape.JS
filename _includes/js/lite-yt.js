// Player do YouTube só entra no clique (youtube-nocookie). O cartão é um <button>: Enter e espaço já funcionam.
(function () {
  document.querySelectorAll('.session-card[data-yt]').forEach(function (card) {
    card.addEventListener('click', function () {
      var id = card.getAttribute('data-yt');
      if (!id || card.getAttribute('data-tocando')) return;
      card.setAttribute('data-tocando', '1');
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      f.title = card.getAttribute('aria-label') || 'Vídeo';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      f.setAttribute('allowfullscreen', '');
      card.replaceChildren(f);
    }, { once: true });
  });
})();
