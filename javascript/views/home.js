define(
  [
    'text!views/home.html',
    'backbone'
  ], function(template) {

  var Home = Backbone.View.extend({

    render: function() {
      $(this.el).html(template);
      return this;
    },

    events: {},

    className: 'view',

    id: 'home'

  });

  return Home;
});
