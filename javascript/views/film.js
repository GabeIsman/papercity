define(
  [
    'text!views/film.html',
    'backbone'
  ],
  function(template) {

  var Film = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      $(this.el).html(template);
      return this;
    },

    events: {
      'click .chapter': function(e) {
        var videoUrl = $(e.currentTarget).data('video-url');
        $('#watch-iframe').attr('src', videoUrl);
      }
    },

    className: 'view',

    id: 'film'

  });

  return Film;
});
