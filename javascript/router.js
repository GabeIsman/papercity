define(
  [
    'views/home',
    'views/about',
    'views/curriculum',
    'views/film',
    'viewmanager',
    'backbone',
  ],
  function(Home, About, Curriculum, Film, ViewManager) {

    var Router = Backbone.Router.extend({
      constructor: function(options) {
        options = options || {};
        options.routes = options.routes || {};

        this.viewManager = new ViewManager();

        options.routes = _.extend({
          '': _.bind(this.viewManager.render, this, Home),
          'about': _.bind(this.viewManager.render, this, About),
          'curriculum': _.bind(this.viewManager.render, this, Curriculum),
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
