var app = app || {};

(function($) {
  'use strict';

  // Food List View
  app.AppView = Backbone.View.extend({
    el: '#mytracker',

    searchTemplate: _.template( $('#search-template').html() ),

    events: {
      'click .add-btn': 'addItem',
      'keyup #serving-size': 'updateSubTotal'
    },

    initialize: function() {
      var self = this;
      this.$input = $('#search-input');
      // this.$results = $('#search-results');

      this.$detail = $('.food-detail');
      this.detailName = $('.detail-name');
      this.detailQty = $('#serving-size');
      this.detailCal = $('.detail-cal');
      this.subCal = $('.sub-total span');

      this.$total = $('#total span');
      this.$list = $('#food-list');

      this.listenTo(app.foods, 'change', this.render);
      this.listenTo(app.foods, 'add', this.renderFood);
      this.listenTo(app.foods, 'reset', this.addAll);
      this.listenTo(app.foods, 'all', this.render);

      app.foods.fetch({reset: true});
    },

    render: function() {
      var total = app.foods.totalCals();
      this.$total.text(total);
    },

    renderFood: function(item) {
      var foodView = new app.FoodView({ model: item });
      this.$list.append(foodView.render().el);
    },

    addAll: function () {
      this.$list.html('');
      app.foods.each(this.renderFood, this);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function () {
      return {
        title: this.detailName.text(),
        quantity: parseInt(this.detailQty.val()),
        calorie: parseInt(this.subCal.text()),
        order: app.foods.nextOrder(),
      };
    },

    addItem: function(food) {
      app.foods.create(this.newAttributes());
      this.$input.val('');
    },

    updateSubTotal: function() {
      var qty = parseInt(this.detailQty.val());
      var cal = parseInt(this.detailCal.text());

      var subTotal = qty * cal;
      this.subCal.text(subTotal);
    }
  });
})(jQuery);