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
        this.popup = new FormPopup();
      },

      render: function(opt_chapterId) {
        var templateData = {
          vimeoUrl: this.vimeoTemplate({ videoId: this.videoId }),
          chapters: _.sortBy(_.values(this.chapterData), 'order'),
          chapterContent: undefined
        };
        var chapter;
        if (opt_chapterId && (chapter = this.chapterData[opt_chapterId])) {
          templateData.vimeoUrl = this.vimeoTemplate({ videoId: opt_chapterId });
          templateData.chapterContent = this.chapterTemplate(chapter);
        }
        $(this.el).html(this.template(templateData));
        if (chapter) {
          this.$('li[data-video-id=' + opt_chapterId + ']').addClass('active');
        }
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
        pcRouter.navigate('film/' + videoId);
      },

      className: 'view',

      id: 'film'

    });

    return Film;
});
