define(
  [
    'background',
    'rafpolyfill'
  ],
  function(BackgroundService) {

    var Scroller = function() {
      this.handleResize();
      $(window).resize(_.bind(this.handleResize, this));
    };

    Scroller.prototype.start = function() {
      this.$topNav = $('#top-nav');
      this.$introHeader = $('.intro-header');
      this.$body = $('body');
      this.backgroundService = new BackgroundService();
      this.updateBackgroundFn = _.bind(_.throttle(this.backgroundService.update, 30), this.backgroundService);
      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };

    Scroller.prototype.stop = function() {
      window.cancelAnimationFrame(this.requestID);
    };

    // TODO: do something about mobile. Default state then turn off?
    Scroller.prototype.animate = function() {

      this.updateNav();

      this.updateBackgroundFn();

      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this))
    };

    Scroller.prototype.updateNav = _.throttle(function() {
      this.scrollTop = this.$body.scrollTop();
      if (this.scrollTop > this.windowHeight / 4) {
        this.$topNav.css('opacity', 1);
        if (this.$introHeader) {
          this.$introHeader.css('opacity', 0);
        }
      } else {
        this.$topNav.css('opacity', 0);
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
