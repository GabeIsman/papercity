require.config({
  baseUrl: '/javascript/',
  paths: {
    text: 'lib/text',
    backbone: 'lib/backbone',
    jquery: 'lib/jquery'
  }
});

require([
  'router',
  'views/navbar',
  'scroller',
  'jquery',
  'lib/underscore',
  'text'
], function(Router, NavBar, Scroller) {
  // Replace this global with some kind of service-locator pattern maybe?
  window.pcRouter = new Router();
  window.scroller = new Scroller();
  pcRouter.start();

  $(document).ready(function() {
    var navBar = new NavBar();
    window.scroller.start();
  });
});
