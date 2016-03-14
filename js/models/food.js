var app = app || {};

(function() {
  'use strict';

  //Food item model
  app.Food = Backbone.Model.extend({
    defaults: {
      title: '',
      quantity: 1,
      calorie: 0
    }
  });
})();

