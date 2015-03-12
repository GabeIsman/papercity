/**
 * Catchall location for little js fixes necessary to make styling prettier.
 * Do not overuse. CSS-only is always preferable.
 */
define(function() {

  var StylingService = function() {

  };

  StylingService.prototype.update = function() {
    $(".vertical-aligner").each(function(index, el) {
      var $el = $(el);
      var outerHeight = $el.parent().outerHeight();
      $el.css('min-height', outerHeight);
    });
  };

  return StylingService;
});
