define(
  [
    'text!views/community.html',
    'backbone'
  ],
  function(template) {

  var Community = Backbone.View.extend({
    // constructor: function() {} - omitted - defaults to superclass constructor
    render: function() {
      $(this.el).html(template);
      return this;
    },

    events: {},

    className: 'view',

    id: 'community'

  });

  return Community;
});
