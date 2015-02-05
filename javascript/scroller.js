define(
  [
    'background',
    'lib/rafpolyfill'
  ],
  function(BackgroundService) {

    // AnimationService?
    var ScrollService = function() {
      this.handleResize();
      $(window).resize(_.bind(this.handleResize, this));
    };

    ScrollService.prototype.start = function() {
      setTimeout(function() { $('#top-nav').css("opacity", 1); }, 500);
      this.$introHeader = $('.intro-header');
      this.$body = $('body');
      this.backgroundService = new BackgroundService();
      this.scrollElements = _.map($('.scroll'), function(el) { return $(el); });
      this.inViewElements = [];
      this.outOfViewElements = this.scrollElements;
      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };

    ScrollService.prototype.stop = function() {
      window.cancelAnimationFrame(this.requestID);
    };

    // TODO: do something about mobile. Default state then turn off?
    ScrollService.prototype.animate = function() {
      this.updateInViewElements();

      this.updateTitle();

      this.backgroundService.update();

      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };

    ScrollService.prototype.updateTitle = _.throttle(function() {
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

    ScrollService.prototype.updateInViewElements = _.throttle(function() {
      var scrollTop = $(window).scrollTop();
      var newlyOutOfView = _.filter(this.inViewElements, function($el) {
        return !isInView($el, scrollTop);
      });
      var newlyInView = _.filter(this.outOfViewElements, function($el) {
        return isInView($el, scrollTop);
      });
      this.outOfViewElements = _.difference(this.outOfViewElements, newlyInView);
      this.outOfViewElements = this.outOfViewElements.concat(newlyOutOfView);
      this.inViewElements = _.difference(this.inViewElements, newlyOutOfView);
      this.inViewElements = this.inViewElements.concat(newlyInView);
      _.each(newlyOutOfView, function($el) {
        $el.removeClass('inview');
      });
      _.each(newlyInView, function($el) {
        $el.addClass('inview');
      });
    }, 250);

    ScrollService.prototype.handleResize = function() {
      this.windowHeight = window.innerHeight;
    };

    function isInView($el, opt_scrollTop) {
      var scrollTop = opt_scrollTop || $(window).scrollTop();
      var scrollBottom = scrollTop + window.innerHeight;
      var elTop = $el.offset().top;
      return elTop < scrollBottom && elTop + $el.height() > scrollTop;
    }

    return ScrollService;
});
