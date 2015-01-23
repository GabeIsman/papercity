define(function() {

  // This view could be doing caching and various other view management tasks.
  // For now it's basically boilerplate.
  var ViewManager = function() {
    // Aspirational.
    this.pastViews = [];
    this.currentView = null;
    this.$contentEl;
  };

  ViewManager.prototype.render = function(viewClass) {
    $(document).ready(_.bind(function() {
      if (!this.$contentEl) {
        this.$contentEl = $('#content-pane');
      }

      var view = new viewClass()

      this.$contentEl.html(view.render().el);

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
    }, this));
  };

  return ViewManager;
});
