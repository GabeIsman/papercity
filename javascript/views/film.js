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

    events: {},

    className: 'view',

    id: 'film'

  });

  return Film;
});
