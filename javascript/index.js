require([
  'router',
  'views/navbar',
  'scroller',
  'jquery',
  'underscore',
  'text'
], function(Router, NavBar, Scroller) {
  // Replace this global with some kind of service-locator pattern maybe?
  window.pcRouter = new Router();
  pcRouter.start();

  $(document).ready(function() {
    var navBar = new NavBar();
    var scroller = new Scroller();
    scroller.start();
  });
});
