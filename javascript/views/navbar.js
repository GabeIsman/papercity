define(
  [
    'backbone'
  ],
  function() {

  var NavBar = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      // Nothing to render - this is a decorated class.
      return this;
    },

    events: {
      'click .nav-target': function(e) {
        var href = $(e.target).data('href');
        if (this.menuOpen) {
          this.toggleMenu();
        }
        window.pcRouter.navigate(href, {trigger: true});
      },
      'click .mobile-nav': 'toggleMenu',
      'click .nav-overlay': 'toggleMenu'
    },

    toggleMenu: function(e) {
      this.$('.sub-nav').toggleClass('open');
      if (this.menuOpen) {
        this.menuOpen = false;
        $('.nav-overlay').remove();
      } else {
        this.menuOpen = true;
        this.$el.append('<div class="nav-overlay"></div>');
      }
    },

    el: '#top-nav',

  });

  return NavBar;
});
