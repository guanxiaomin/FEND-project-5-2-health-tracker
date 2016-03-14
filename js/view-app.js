var app = app || {};

(function($) {
  'use strict';

  // Food List View
  app.AppView = Backbone.View.extend({
    el: '#mytracker',

    searchTemplate: _.template( $('#search-template').html() ),

    events: {
      'click .add-btn': 'addItem',
      // 'keypress #search-input': 'searchFood',
      // 'click .search-btn': 'searchFood'
    },

    initialize: function() {
      var self = this;
      this.$input = $('#search-input');
      this.$results = $('#search-results');

      this.detailName = $('.detail-name');
      this.detailQty = $('.serving-size');
      this.detailCal = $('.detail-cal span');

      this.$total = $('#total span');
      this.$list = $('#food-list');

      this.listenTo(app.foods, 'change', this.render);
      this.listenTo(app.foods, 'add', this.renderFood);

      // this.render();
      app.foods.fetch({reset: true});
      
      // submit form to request ajax
      $('#search').submit(function() {
        // var keyword = $.trim(self.$input.val());
        var keyword = 'apple';
        self.searchFood(keyword);
        return false;
      });
    },

    render: function() {

      var total = 0;
      _.each(app.foods, function(food) {
        console.log(total);
        total += food.get('calorie');
      });

      this.$total.text(total);
      // console.log(total);
      return this;
    },

    renderFood: function(item) {
      var foodView = new app.FoodView({ model: item });
      this.$list.append(foodView.render().el);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function () {
      return {
        title: this.detailName.text(),
        quantity: Number(this.detailQty.val()),
        calorie: parseInt(this.detailCal.text())
      };
    },

    addItem: function(food) {
      // console.log(this.newAttributes());
      // console.log(app.foods.length);
      app.foods.create(this.newAttributes());
      // this.$input.val('');
    },

    // Get Ajax and search list display
    searchFood: function(keyword) {
      var self = this;
      // var keyword = $.trim(self.$input.val());
      self.$results.html('');
      var nutritionURL = 'https://api.nutritionix.com/v1_1/search/'+ keyword + '?results=0%3A15&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=1dad01c5&appKey=a4ef0e3cc84c0a803eb5a56c3086f895';
      $.getJSON(nutritionURL).done(function(data) {
        var res = data.hits;
        if (res.length > 0) {
          self.showResult(res);
        }
        else {
          self.$results.append('<h4>No results for "'+ keyword + '", try another search.</h4>');
        }
        
      }).fail(function(e) {
        console.log('Nutritionix error');
        self.$results.append('Fail to get Nutritionix resources.')
      });
    },

    showResult: function(res) {
      var self = this;
      res.forEach(function(item) {
        self.$results.append(self.searchTemplate({
          name: item.fields.item_name,
          brand: item.fields.brand_name,
          calories: parseInt(item.fields.nf_calories) // return calories in Int
        }));
      });

      // select food and display on detail section
      $('#search-results li').click(function() {
        
        var name = $(this).find('h4').text();
        var cal = $(this).find('span').text();

        self.detailName.text(name);
        self.detailCal.text(cal);
      });
    },

    
  });
})(jQuery);