define(
  [
    'views/home',
    'views/about',
    'views/community',
    'views/film',
    'viewmanager',
    'backbone',
  ],
  function(Home, About, Community, Film, ViewManager) {

    var Router = Backbone.Router.extend({
      constructor: function(options) {
        options = options || {};
        options.routes = options.routes || {};

        this.viewManager = new ViewManager();

        options.routes = _.extend({
          '': _.bind(this.viewManager.render, this, Home),
          'about': _.bind(this.viewManager.render, this, About),
          'community': _.bind(this.viewManager.render, this, Community),
          'film': _.bind(this.viewManager.render, this, Film),
        }, options.routes);
        this.constructor.__super__.constructor.call(this, options);
      },

      start: function() {
        Backbone.history.start();
      }
    });

    return Router;
});
