define(
  ['backbone'],
  function() {

  var Footer = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      // Give the rest of the page a chance to render before the footer.
      setTimeout(_.bind(function() { $(this.el).css({ opacity: 1 }); }, this), 300);
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
