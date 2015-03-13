define(
  [
    'views/formpopup',
    'text!views/community.html',
    'backbone'
  ],
  function(FormPopup, template) {

    var Community = Backbone.View.extend({
      initialize: function() {
        this.popup = new FormPopup();
        this.template = _.template(template);
      },

      render: function() {
        var tumblrPost = $('.tumblr_posts')[0];
        var tumblrContent = '';
        if (tumblrPost) {
          tumblrContent = tumblrPost.outerHTML;
        }
        $(this.el).html(this.template({
          tumblrContent: tumblrContent
        }));
        return this;
      },

      openPopup: function() {
        this.popup.open();
      },

      events: {
        'click .access-link': 'openPopup',
      },

      className: 'view',

      id: 'community'

    });

    return Community;
});
