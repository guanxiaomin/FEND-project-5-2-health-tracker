var app = app || {};

(function($) {
  'use strict';

  // Food List View
  app.AppView = Backbone.View.extend({
    el: '#mytracker',

    events: {
      'click .add-btn': 'addItem',
    },

    initialize: function() {
      this.search = $('#search-input');
      this.detailName = $('.detail-name');
      this.detailQty = $('.serving-size');
      this.detailCal = $('.detailCal');

      this.$total = $('#total span');
      this.$list = $('#food-list');

      this.listenTo(app.foods, 'change', this.render);
      this.listenTo(app.foods, 'add', this.addItem);
      this.render();
    },

    render: function() {
      _.each(app.foods, function(item) {
        this.renderFood(item);
      }, this);

      var total = 0;
      _.each(app.foods, function(food) {
        total += food.get('calorie');
      });

      this.$total.text(total);
      // console.log(total);
      return this;
    },

    renderFood: function(item) {
      var foodView = app.FoodView({
        model: item
      })
      this.$el.append(foodView.render.el);
      console.log(this.$el);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function () {
      return {
        title: this.detailName,
        quantity: this.detailQty,
        calorie: this.detailCal
      };
    },

    addItem: function(e) {
      // app.foods.add(this.newAttributes());
      // console.log(this.detailQty);
      this.search.val('');
    },

    
  });
})(jQuery);