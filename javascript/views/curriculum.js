define(
  ['backbone'],
  function() {

  var Curriculum = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      return this;
    },

    events: {},

    className: 'view',

    id: 'curriculum'

  });

  return Curriculum;
});
