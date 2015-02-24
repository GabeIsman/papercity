define(
  [
    'views/home',
    'views/about',
    'views/film',
    'views/community',
    'views/curriculum',
    'viewmanager',
    'backbone',
  ],
  function(Home, About, Film, Community, Curriculum, ViewManager) {

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
          'curriculum': _.bind(this.viewManager.render, this, Curriculum),
        }, options.routes);
        this.constructor.__super__.constructor.call(this, options);
      },

      start: function() {
        Backbone.history.start();
      }
    });

    return Router;
});
