---
# Um arquivo só, concatenado pelo Jekyll a partir de _includes/js/*.js. Sem bibliotecas.
---
(function () {
  'use strict';
{% include js/track.js %}
{% include js/dialog.js %}
{% include js/header.js %}
{% include js/reveal.js %}
{% include js/carousel.js %}
{% include js/spy.js %}
{% include js/lite-yt.js %}
{% include js/copy.js %}
{% include js/subscribe.js %}
{% include js/top.js %}
{% include js/analytics.js %}
})();
