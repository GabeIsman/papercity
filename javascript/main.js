require.config({
  baseUrl: '/javascript/',
  paths: {
    text: 'lib/text',
    backbone: 'lib/backbone',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    rafpolyfill: 'lib/rafpolyfill',
  }
});


define(
  'main',
  [
    'router',
    'views/navbar',
    'views/footer',
    'scroller',
    'jquery',
    'underscore',
    'text'
  ],
  function(Router, NavBar, Footer, Scroller) {
    // Replace this global with some kind of service-locator pattern maybe?
    window.pcRouter = new Router();
    window.scroller = new Scroller();
    pcRouter.start();

    $(document).ready(function() {
      var navBar = new NavBar();
      var footer = new Footer();
      navBar.render();
      footer.render();
      window.scroller.start();
    });
  });
