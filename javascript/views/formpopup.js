define(
  [
    'views/popup',
    'text!views/form.html',
    'backbone'
  ],
  function(Popup, template) {

    var FormPopup = Popup.extend({
      // To be overridden
      getContent: function() {
        return template;
      },

      getTitle: function() {
        return 'We need your help!'
      },

      getDescription: function() {
        return 'If you are an educator, or someone passionate about social justice, we want to hear from you!';
      },

      popupClass: 'form-popup',
    });

    return FormPopup;
  });
