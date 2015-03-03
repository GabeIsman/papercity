define(
  [
    'views/formpopup',
    'text!views/home.html',
    'backbone'
  ], function(FormPopup, template) {

  var Home = Backbone.View.extend({
    initialize: function() {
      this.popup = new FormPopup();
    },

    render: function() {
      $(this.el).html(template);
      return this;
    },

    openPopup: function() {
      this.popup.open();
    },

    events: {
      'click .access-link': 'openPopup',
    },

    className: 'view',

    id: 'home'

  });

  return Home;
});
