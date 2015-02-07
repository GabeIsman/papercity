define(
  ['backbone'],
  function() {

  var Footer = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      // Nothing to render - this is a decorated class.
      return this;
    },

    events: {
      'click a': function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        window.pcRouter.navigate(href, {trigger: true});
      }
    },

    el: '#page-footer',

  });

  return Footer;
});
