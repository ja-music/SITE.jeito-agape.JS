// Menu mobile e modais de autor como <dialog>: foco preso, Esc e clique no fundo fecham — tudo nativo.
(function () {
  if (typeof HTMLDialogElement !== 'function') return;
  function ligar(dlg, abridor) {
    if (!dlg) return;
    if (abridor) abridor.addEventListener('click', function () { dlg.showModal(); abridor.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', function () { if (abridor) abridor.setAttribute('aria-expanded', 'false'); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelectorAll('[data-fechar]').forEach(function (el) { el.addEventListener('click', function () { dlg.close(); }); });
    dlg.querySelectorAll('a[href]').forEach(function (a) { a.addEventListener('click', function () { dlg.close(); }); });
  }
  ligar(document.getElementById('menu'), document.getElementById('menu-abrir'));
  document.querySelectorAll('[data-dialog-open]').forEach(function (btn) { ligar(document.getElementById(btn.getAttribute('data-dialog-open')), btn); });
})();
