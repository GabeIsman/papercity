define(
  ['backbone'],
  function() {

  var NavBar = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      // Nothing to render - this is a decorated class.
      return this;
    },

    events: {
      'click .nav-item': function(e) {
        var href = $(e.target).data('href');
        window.pcRouter.navigate(href, {trigger: true});
      }
    },

    el: '#top-nav',

  });

  return NavBar;
});
