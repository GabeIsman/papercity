define(function() {

  // This view could be doing caching and various other view management tasks.
  // For now it's basically boilerplate.
  var ViewManager = function() {
    // Aspirational.
    this.pastViews = [];
    this.currentView = null;
    this.$contentEl = null;
  };

  ViewManager.prototype.render = function(viewClass, id) {
    $(document).ready(_.bind(function() {
      if (!this.$contentEl) {
        this.$contentEl = $('#content-pane');
      }

      var view = new viewClass();

      // id is optional, to be handled by views as necessary.
      this.$contentEl.html(view.render(id).el);

      if (view.enterDocument) {
        view.enterDocument();
      }

      if (this.currentView) {
        // Can be fancier.
        this.currentView.remove();
      }

      this.currentView = view;

      window.scroller.stop();
      window.scroller.start();
      window.stylingService.update();
    }, this));
  };

  return ViewManager;
});
