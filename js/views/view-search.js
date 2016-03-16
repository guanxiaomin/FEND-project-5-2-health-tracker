var app = app || {};

(function($) {
  'use strict';

  app.SearchView = Backbone.View.extend({
    
    el: '#mytracker',

    searchTemplate: _.template( $('#search-template').html() ),

    events: {
      'submit #search-bar': 'submit',
    },

    initialize: function() {
      // var self = this;
      this.$input = $('#search-input');
      this.$results = $('#search-results');

      this.$detail = $('.food-detail');
      this.detailName = $('.detail-name');
      this.detailBrand = $('.detail-brand');
      this.detailQty = $('#serving-size');
      this.detailCal = $('.detail-cal');
      this.subTotalCal = $('.sub-total span');
      this.addBtn = $('.add-btn');
    },

    render: function() {
      var self = this;
      this.$results.html('');
      if (!app.results.length) {
        this.$results.append('<h4>No results, try another search.</h4>');
      }
      app.results.each( function(item) {
        this.$results.append(this.searchTemplate({
          name: item.attributes.fields.item_name,
          brand: item.attributes.fields.brand_name,
          calories: parseInt(item.attributes.fields.nf_calories) // return calories in Int
        }));
      }, this); 

      // select food and display on detail section
      this.$results.children().click( function() {
        self.$detail.removeClass('hidden');
        self.addBtn.removeClass('hidden');

        var name = $(this).find('h4').text();
        var brand = $(this).find('h5').text();
        var cal = $(this).find('span').text();
        
        self.detailName.text(name);
        self.detailBrand.text(brand);
        self.detailCal.text(cal);
        self.detailQty.val('1');
        self.subTotalCal.text(cal);
      });
    },

    submit: function(e) {
      e.preventDefault();
      var keyword = this.$input.val().trim();
      app.results = new app.SearchResults({ query: keyword });
      this.search();
    },

    search: function() {
      var self = this;
      app.results.on('sync', function(){
        this.render();
      }, this);
      app.results.fetch({
        success: function(collection, response) {
        },
        error: function() {
          console.log('Nutritionix error');
          self.$results.append('<h4>Fail to get Nutritionix resources.</h4>')
        }
      });
    },
  });
})(jQuery);