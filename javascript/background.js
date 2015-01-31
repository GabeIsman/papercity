define(function() {
  var BackgroundService = function() {
    this.$panes = $('.pane');
    this.panePositions = _.map(this.$panes, function(pane) {
      var $pane = $(pane);
      return $pane.offset().top + $pane.height();
    });
    this.lastScrollTop = 0;
    this.$backgrounds = _.map($('.background'), function(el) {
      return $(el);
    });
  };

  BackgroundService.prototype.update = function() {
    var scrollTop = $(window).scrollTop();
    if (Math.abs(this.lastScrollTop - scrollTop) < 50) {
      return;
    }
    this.lastScrollTop = scrollTop;
    var windowHeight = window.innerHeight;
    var i;
    var $pane;
    var bottomPosition;
    for (i = 0; i < this.panePositions.length; i++) {
      bottomPosition = this.panePositions[i] - scrollTop;
      if (bottomPosition > 0) {
        break;
      }
    }

    var $backgroundImage = this.$backgrounds[this.$backgrounds.length - i - 1];
    if (!$backgroundImage) {
      return;
    }
    var bgBottom = windowHeight - bottomPosition;
    $backgroundImage.css('bottom', bgBottom);
    var $lastBackgroundImage = this.$backgrounds[this.$backgrounds.length - i];
    if ($lastBackgroundImage) {
      $lastBackgroundImage.css('bottom', windowHeight + 'px');
    }
    var $nextBackgroundImage = this.$backgrounds[this.$backgrounds.length - i - 2];
    if ($nextBackgroundImage) {
      $nextBackgroundImage.css('bottom', 0);
    }
  };

  return BackgroundService;
});
