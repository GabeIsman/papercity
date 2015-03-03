define(
  [
    'text!views/popup.html',
    'backbone'
  ],
  function(template) {

    var Popup = Backbone.View.extend({
      el: '#popup-container',

      initialize: function() {
        this.template = _.template(template);
        this.content = this.getContent();
      },

      render: function() {
        $(this.el).html(this.template({
          body: this.content,
          popupClass: this.popupClass
        }));
        this.recenter();
        return this;
      },

      recenter: function() {
        var popup = this.$('.popup');
        var width = popup.width();
        var height = popup.height();
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        var left = (screenWidth - width) / 2;
        var top = Math.max((screenHeight - height) / 2, 50);
        height = Math.min(height, screenHeight - 100);
        popup.css({
          'top': top,
          'left': left,
          'height': height
        });
      },

      // To be overridden
      getContent: function() {},

      open: function() {
        $(this.el).css({
          opacity: 0,
          display: 'block'
        });
        this.render();
        $(this.el).css({
          opacity: 1
        });
        $('body').addClass('modal-open');
      },

      close: function() {
        $(this.el).css({
          display: 'none'
        });
        $('body').removeClass('modal-open');
      },

      events: {
        'click .popup-exit': 'close',
        'click .popup-overlay': 'close'
      },

      // Override to provide popup specific styles
      popupClass: '',
    });

    return Popup;
  });
