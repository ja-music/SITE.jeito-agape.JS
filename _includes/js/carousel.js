// Carrossel do herói: a lógica original (crossfade com blur, dots, autoplay de 30 s), sem biblioteca.
(function () {
  var slides = document.querySelectorAll('#heroCarousel .carousel-slide'), dots = document.querySelectorAll('.carousel-dot');
  if (slides.length < 2 || !dots.length) return;
  var atual = 0, transicionando = false, timer = null;
  var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  slides.forEach(function (s, i) { if (i !== 0) s.setAttribute('inert', ''); });
  function irPara(i) {
    if (i === atual || transicionando) return;
    transicionando = true;
    var anterior = atual; atual = i;
    dots[anterior].classList.remove('active'); dots[anterior].setAttribute('aria-pressed', 'false');
    dots[atual].classList.add('active'); dots[atual].setAttribute('aria-pressed', 'true');
    slides[anterior].classList.remove('active'); slides[anterior].classList.add('leaving');
    slides[atual].classList.add('active');
    slides[anterior].setAttribute('inert', ''); slides[atual].removeAttribute('inert');
    setTimeout(function () { slides[anterior].classList.remove('leaving'); transicionando = false; }, reduzido ? 650 : 1900);
  }
  function proximo() { irPara((atual + 1) % slides.length); }
  function iniciar() { parar(); if (!reduzido && !document.hidden) timer = setInterval(proximo, 30000); }
  function parar() { if (timer) { clearInterval(timer); timer = null; } }
  dots.forEach(function (dot) { dot.addEventListener('click', function () { irPara(Number(dot.getAttribute('data-slide'))); iniciar(); }); });
  document.addEventListener('visibilitychange', function () { document.hidden ? parar() : iniciar(); });
  iniciar();
})();
