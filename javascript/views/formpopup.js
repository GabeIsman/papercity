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

      popupClass: 'form-popup',
    });

    return FormPopup;
  });
