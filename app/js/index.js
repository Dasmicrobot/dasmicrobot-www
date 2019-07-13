require('../css/theme.min.css');
require('../css/main.css');
require('../css/header.css');
window.jQuery = window.$ = require('jquery');
window.Popper = require('popper.js/dist/umd/popper.js');
window.SVGInjector = require('svg-injector')
require('bootstrap/dist/js/bootstrap.bundle.js');
require('../js/theme.min.js');

document.addEventListener("DOMContentLoaded", () => {
  // initialization of show animations
  window.$.HSCore.components.HSShowAnimation.init('.js-animation-link');
  window.$.HSCore.components.HSSVGIngector.init('.js-svg-injector');
});

