define(
  [
    'background',
    'lib/rafpolyfill'
  ],
  function(BackgroundService) {

    // AnimationService?
    var Scroller = function() {
      this.handleResize();
      $(window).resize(_.bind(this.handleResize, this));
    };

    Scroller.prototype.start = function() {

      setTimeout(function() { $('#top-nav').css("opacity", 1); }, 500);
      this.$introHeader = $('.intro-header');
      this.$body = $('body');
      this.backgroundService = new BackgroundService();
      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };

    Scroller.prototype.stop = function() {
      window.cancelAnimationFrame(this.requestID);
    };

    // TODO: do something about mobile. Default state then turn off?
    Scroller.prototype.animate = function() {

      this.updateTitle();

      this.backgroundService.update();

      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };

    Scroller.prototype.updateTitle = _.throttle(function() {
      this.scrollTop = this.$body.scrollTop();
      if (this.scrollTop > this.windowHeight / 4) {
        if (this.$introHeader) {
          this.$introHeader.css('opacity', 0);
        }
      } else {
        if (this.$introHeader) {
          this.$introHeader.css('opacity', 1);
        }
      }
    }, 100);

    Scroller.prototype.handleResize = function() {
      this.windowHeight = window.innerHeight;
    };

    return Scroller;
});
