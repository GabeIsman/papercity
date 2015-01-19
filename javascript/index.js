require([
  'jquery',
  'underscore',
  'scroller'
], function($, _, Scroller) {
  $(document).ready(function() {
    var scroller = new Scroller();
    scroller.start();
  });
});
