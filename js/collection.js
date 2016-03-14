var app = app || {};

(function() {
  'use strict';

  //Food collection
  app.FoodList = Backbone.Collection.extend({
    
    model: app.Food,

    // Save all of the food items under the `"foods"` namespace.
    localStorage: new Backbone.LocalStorage('foods-backbone'),

    totalCals: function() {
      var total = 0;
      this.each(function(food) {
        total += food.get('calorie');
      });
      return total;
    },
    // We keep the Food Items in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    // Items are sorted by their original insertion order.
    comparator: 'order'
  });

  // Create our global collection of `FoodList`.
  app.foods = new app.FoodList();
})();