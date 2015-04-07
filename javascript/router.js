define(
  [
    'views/home',
    'views/about',
    'views/film',
    'views/community',
    'views/curriculum',
    'viewmanager',
    'backbone',
    'underscore'
  ],
  function(Home, About, Film, Community, Curriculum, ViewManager) {

    var Router = Backbone.Router.extend({
      constructor: function(options) {
        options = options || {};
        options.routes = options.routes || {};

        this.viewManager = new ViewManager();

        options.routes = _.extend({
          '': _.bind(this.viewManager.render, this.viewManager, Home),
          'about': _.bind(this.viewManager.render, this.viewManager, About),
          'community': _.bind(this.viewManager.render, this.viewManager, Community),
          'film': _.bind(this.viewManager.render, this.viewManager, Film),
          'film/:id': _.bind(this.viewManager.render, this.viewManager, Film),
          'curriculum': _.bind(this.viewManager.render, this.viewManager, Curriculum),
        }, options.routes);
        this.constructor.__super__.constructor.call(this, options);
      },

      start: function() {
        Backbone.history.start();
      }
    });

    return Router;
});
