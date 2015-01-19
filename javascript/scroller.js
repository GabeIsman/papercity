define(
  ['rafpolyfill'],
  function() {

    var Scroller = function() {
      this.handleResize();
      $(window).resize(_.bind(this.handleResize, this));
    };

    Scroller.prototype.start = function() {
      this.$topNav = $('#top-nav');
      this.$introHeader = $('.intro-header');
      this.$body = $('body');
      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };

    Scroller.prototype.stop = function() {
      window.cancelAnimationFrame(this.requestID);
    };

    // TODO: do something about mobile. Default state then turn off?
    Scroller.prototype.animate = function() {
      this.scrollTop = this.$body.scrollTop();
      console.log(this.scrollTop, this.windowHeight);
      if (this.scrollTop > this.windowHeight / 4) {
        this.$topNav.css('opacity', 1);
        this.$introHeader.css('opacity', 0);
      } else {
        this.$topNav.css('opacity', 0);
        this.$introHeader.css('opacity', 1);
      }



      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this))
    };

    Scroller.prototype.handleResize = function() {
      this.windowHeight = window.innerHeight;
    };

    return Scroller;
});
