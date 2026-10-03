// Copiar link do post, com aviso em aria-live.
(function () {
  var btn = document.getElementById('copy-link'), toast = document.getElementById('toast');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var url = window.location.href;
    function ok() { if (!toast) return; toast.textContent = 'Link copiado'; toast.classList.add('is-visible'); setTimeout(function () { toast.classList.remove('is-visible'); }, 1600); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, function () { window.prompt('Copie o link:', url); });
    else window.prompt('Copie o link:', url);
  });
})();
