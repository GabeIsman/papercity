define(
  ['backbone'],
  function() {

  var About = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      return this;
    },

    events: {},

    className: 'view',

    id: 'about'

  });

  return About;
});
