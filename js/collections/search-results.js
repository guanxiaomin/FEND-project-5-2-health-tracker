var app = app || {};

(function() {
  'use strict';

  //Food collection
  app.SearchResults = Backbone.Collection.extend({
    
    model: app.Result,

    initialize: function(options) {
      this.query = options.query;
    },

    url: function() {
      return 'https://api.nutritionix.com/v1_1/search/'+ this.query + '?results=0%3A15&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=1dad01c5&appKey=a4ef0e3cc84c0a803eb5a56c3086f895';
    },

    parse: function(response) {
      return response.hits;
    },
  });

})();