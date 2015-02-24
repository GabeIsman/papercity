define(
  [
    'text!views/curriculum.html',
    'backbone'
  ],
  function(template) {

  var Curriculum = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      $(this.el).html(template);
      return this;
    },

    events: {},

    className: 'view',

    id: 'curriculum'

  });

  return Curriculum;
});
