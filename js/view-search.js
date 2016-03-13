var app = app || {};

(function($) {
  'use strict';

  // Search result List View
  app.SearchView = Backbone.View.extend({

    searchTemplate: _.template( $('#search-template').html() ),

    initialize: function() {
      var self = this;
      this.input = $('#search-input');
      this.searchBtn = $('.search-btn');
      this.searchRes = $('#search-results');

      // submit form to request ajax
      $('#search').submit(function() {
        var keyword = $.trim(self.input.val());
        self.searchFood(keyword);
        return false;
      });
    },

    // Get Ajax and search list display
    searchFood: function(keyword) {
      var self = this;
      
      self.searchRes.html('');
      var nutritionURL = 'https://api.nutritionix.com/v1_1/search/'+ keyword + '?results=0%3A15&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=1dad01c5&appKey=a4ef0e3cc84c0a803eb5a56c3086f895';
      $.getJSON(nutritionURL).done(function(data) {
        var res = data.hits;
        if (res.length > 0) {
          self.showResult(res);
        }
        else {
          self.searchRes.append('<h4>No results for "'+ keyword + '", try another search.</h4>');
        }
        
      }).fail(function(e) {
        console.log('Nutritionix error');
        self.searchRes.append('Fail to get Nutritionix resources.')
      });
    },

    showResult: function(res) {
      var self = this;
      res.forEach(function(item) {
        self.searchRes.append(self.searchTemplate({
          name: item.fields.item_name,
          brand: item.fields.brand_name,
          calories: parseInt(item.fields.nf_calories) // return calories in Int
        }));
      });

      // select food and display on detail section
      $('#search-results li').click(function() {
        
        var name = $(this).find('h4').text();
        var cal = $(this).find('span').text();

        $('.detail-name').html(name);
        $('.detail-cal').html(cal);
      });
    },
  });
})(jQuery);