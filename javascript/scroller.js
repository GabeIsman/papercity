define(
  [
    'rafpolyfill',
    'underscore'
  ],
  function() {

    // AnimationService?
    var ScrollService = function() {
      $(window).resize(_.bind(this.handleResize, this));
      this.isMobile = isMobile();
      this.animationFunctions = this.getAnimationFunctions();
    };


    ScrollService.prototype.start = function() {
      this.handleResize();
      this.$introHeader = $('.intro-header');
      this.$body = $('body');
      this.scrollElements = _.map($('.scroll'), function(el) { return $(el); });
      this.inViewElements = [];
      this.outOfViewElements = this.scrollElements;
      this.initializeAnimations();
      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };


    ScrollService.prototype.stop = function() {
      window.cancelAnimationFrame(this.requestID);
    };


    ScrollService.prototype.animate = function() {
      _.each(this.animationFunctions, function(fn) {
        fn.call(this);
      }, this);

      this.requestID = window.requestAnimationFrame(_.bind(this.animate, this));
    };


    ScrollService.prototype.updateTitle = function() {
      this.scrollTop = this.$body.scrollTop();
      if (this.scrollTop < this.windowHeight) {
        var titleSpacing = this.baselineTitleSpacing - (this.scrollTop / 5);
        this.$introHeader.css({
          'transform': 'translateY(' + titleSpacing + 'px)' ,
          '-webkit-transform': 'translateY(' + titleSpacing + 'px)' ,
          '-moz-transform': 'translateY(' + titleSpacing + 'px)' ,
          '-ms-transform': 'translateY(' + titleSpacing + 'px)' ,
          'opacity': 1 - (this.scrollTop / this.windowHeight)
        });
      } else {
        this.$introHeader.css('opacity', 0);
      }
    };


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
      var $titleBackground = $('.title-background').first();
      this.baselineTitleSpacing = $titleBackground.outerHeight() / 2;
    };


    ScrollService.prototype.initializeAnimations = function() {

    };


    ScrollService.prototype.getAnimationFunctions = function() {
      if (this.isMobile) {
        return [this.updateInViewElements, this.updateTitle];
      } else {
        return [this.updateInViewElements, this.updateTitle];
      }
    };


    function isInView($el, opt_scrollTop) {
      var scrollTop = opt_scrollTop || $(window).scrollTop();
      var scrollBottom = scrollTop + window.innerHeight;
      var elTop = $el.offset().top;
      return elTop < scrollBottom && elTop + $el.height() > scrollTop;
    }

    // Lifted from http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    // Returns fals for tablets.
    function isMobile() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true; })(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    return ScrollService;
});
