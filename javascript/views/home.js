define(
  [
    'scroller',
    'backbone'
  ], function(Scroller) {

  var Home = Backbone.View.extend({
    constructor: function() {
      this.scroller = new Scroller();
    },

    render: function() {
      debugger;
      return this;
    },

    enterDocument: function() {
      this.scroller.start();
    },

    events: {},

    className: 'view',

    id: 'home'

  });

  return Home;
});
