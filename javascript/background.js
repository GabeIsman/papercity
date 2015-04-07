define(function() {
  var BackgroundService = function() {
    this.$panes = $('.pane');
    this.lastScrollTop = 0;
    this.$backgrounds = _.map($('.background-container'), function(el) {
      return $(el);
    });
    this.resize();
    $(window).resize(_.bind(this.resize, this));
  };

  BackgroundService.prototype.update = function() {
    var scrollTop = $(window).scrollTop();
    this.lastScrollTop = scrollTop;
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
    var bgBottom = this.windowHeight - bottomPosition;
    $backgroundImage.css('bottom', bgBottom);
    var $lastBackgroundImage = this.$backgrounds[this.$backgrounds.length - i];
    if ($lastBackgroundImage) {
      $lastBackgroundImage.css('bottom', this.windowHeight + 'px');
    }
    var $nextBackgroundImage = this.$backgrounds[this.$backgrounds.length - i - 2];
    if ($nextBackgroundImage) {
      $nextBackgroundImage.css('bottom', 0);
    }
  };

  BackgroundService.prototype.resize = function() {
    this.windowHeight = window.innerHeight;
    var spacing = this.windowHeight - 100;
    $('.background-spacer').css('margin-top', spacing + 'px');
    this.panePositions = _.map(this.$panes, function(pane) {
      var $pane = $(pane);
      return $pane.offset().top + $pane.height();
    });
  };

  return BackgroundService;
});
