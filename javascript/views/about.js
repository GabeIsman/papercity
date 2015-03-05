define(
  [
    'text!views/about.html',
    'backbone'
  ],
  function(template) {

    var About = Backbone.View.extend({
      // constructor: function() {} - omitted - defaults to superclass constructor
      render: function() {
        $(this.el).html(template);
        return this;
      },

      events: {},

      className: 'view',

      id: 'about'

    });

    return About;
});
