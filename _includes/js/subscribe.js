// Inscrição do blog: abre o e-mail já preenchido (não há servidor; o mesmo comportamento do site original).
(function () {
  var form = document.getElementById('subscribeForm'), campo = document.getElementById('subscribeEmail');
  if (!form || !campo) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var para = form.getAttribute('data-email') || 'contato@jeitoagape.com.br';
    var assunto = encodeURIComponent('Inscrição no Blog - Jeito Ágape');
    var corpo = encodeURIComponent('Olá! Gostaria de me inscrever para receber os artigos do blog.\n\nMeu e-mail: ' + campo.value);
    window.location.href = 'mailto:' + para + '?subject=' + assunto + '&body=' + corpo;
    campo.value = '';
  });
})();
