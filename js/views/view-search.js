var app = app || {};

(function($) {
  'use strict';

  app.SearchView = Backbone.View.extend({
    
    el: '#search-div',

    searchTemplate: _.template( $('#search-template').html() ),

    events: {
      'submit #search-bar': 'submit',
    },

    initialize: function() {
      this.$input = $('#search-input');
      this.$results = $('#search-results');

      this.$detail = $('.food-detail');
      this.detailName = $('.detail-name');
      this.detailQty = $('#serving-size');
      this.detailCal = $('.detail-cal span');
    },

    render: function() {
      this.$results.html('');
      if (!app.results.length) {
        this.$results.append('<h4>No results, try another search.</h4>');
      }
      app.results.each( function(item) {
        // console.log(item);
        this.$results.append(this.searchTemplate({
          name: item.attributes.fields.item_name,
          brand: item.attributes.fields.brand_name,
          calories: parseInt(item.attributes.fields.nf_calories) // return calories in Int
        }));
      }, this); 

      // select food and display on detail section
      this.$results.children().click( function() {
        $('.food-detail').removeClass('hidden');
        $('.add-btn').removeClass('hidden');
        var name = $(this).find('h4').text();
        var brand = $(this).find('h5').text();
        var cal = $(this).find('span').text();
        
        $('.detail-name').text(name);
        $('.detail-brand').text(brand);
        $('.detail-cal').text(cal);
        $('#serving-size').val('1');
        $('.sub-total span').text(cal);
      });
    },

    submit: function(e) {
      e.preventDefault();
      var keyword = this.$input.val().trim();
      app.results = new app.SearchResults({ query: keyword });
      this.search();
    },

    search: function() {
      app.results.on('sync', function(){
        this.render();
      }, this);
      app.results.fetch({
        success: function(collection, response) {
          // console.log(app.results.toJSON());
        },
        error: function() {
          console.log('Nutritionix error');
          // self.$results.append('Fail to get Nutritionix resources.')
        }
      });
    },
  });
})(jQuery);