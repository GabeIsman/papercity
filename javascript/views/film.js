define(
  [
    'views/formpopup',
    'views/chapterdata',
    'text!views/vimeo.txt',
    'text!views/chapter.html',
    'text!views/film.html',
    'backbone'
  ],
  function(FormPopup, chapterData, vimeoUrl, chapterTemplate, template) {

    var Film = Backbone.View.extend({
      vimeoTemplate: _.template(vimeoUrl),

      template: _.template(template),

      videoId: '119016461',

      chapterData: chapterData,

      chapterTemplate: _.template(chapterTemplate),

      initialize: function() {
        console.log(this.chapterData);
        this.popup = new FormPopup();
      },

      render: function() {
        $(this.el).html(this.template({
          vimeoUrl: this.vimeoTemplate({ videoId: this.videoId })
        }));
        return this;
      },

      openPopup: function() {
        this.popup.open();
      },

      events: {
        'click .chapter': 'handleChapterClick',
        'click .access-link': 'openPopup',
      },

      handleChapterClick: function(e) {
        var $currentTarget = $(e.currentTarget);
        var videoId = $currentTarget.data('video-id');
        var chapterDatum = this.chapterData[videoId];
        $('#watch-iframe')
          .attr('src', this.vimeoTemplate({ videoId: videoId }));
        $('#curriculum-content').html(this.chapterTemplate(chapterDatum));
        $('.chapter').removeClass('active');
        $currentTarget.addClass('active');
      },

      className: 'view',

      id: 'film'

    });

    return Film;
});
