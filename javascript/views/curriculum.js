define(
  [
    'views/formpopup',
    'text!views/curriculum.html',
    'backbone'
  ],
  function(FormPopup, template) {

  var Curriculum = Backbone.View.extend({
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
      'click .access-link': 'openPopup',
    },

    className: 'view',

    id: 'curriculum'

  });

  return Curriculum;
});
