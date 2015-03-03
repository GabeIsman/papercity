define(
  [
    'views/formpopup',
    'text!views/film.html',
    'backbone'
  ],
  function(FormPopup, template) {

  var Film = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
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
      'click .chapter': function(e) {
        var videoUrl = $(e.currentTarget).data('video-url');
        $('#watch-iframe').attr('src', videoUrl);
      },
      'click .access-link': 'openPopup',
    },

    className: 'view',

    id: 'film'

  });

  return Film;
});
