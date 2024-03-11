(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .filter('price', PriceFilter);;

  function PriceFilter() {
    return function (input) {
      return '$$$' + input.toFixed(2);
    };
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    toBuyCtrl.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
    toBuyCtrl.buyItem = function (item) {
      ShoppingListCheckOffService.buyItem(item);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtCtrl = this;
    boughtCtrl.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // Initial list of items to buy
    var itemsToBuy = [
      { name: "Butter", quantity: 5, pricePerItem: 1.50 },
      { name: "Cream Cheese", quantity: 3, pricePerItem: 3.50 },
      { name: "Milk", quantity: 2, pricePerItem: 4.50 },
      { name: "Sugar", quantity: 1, pricePerItem: 10.00 },
      { name: "Eggs", quantity: 12, pricePerItem: 0.50 }
    ];

    // List of bought items
    var boughtItems = [];

    // Get "to buy" items
    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    // Get "bought" items
    service.getBoughtItems = function () {
      return boughtItems;
    };

    // Buy item and move to "bought" list
    service.buyItem = function (item) {
      boughtItems.push({
        name: item.name,
        quantity: item.quantity,
        pricePerItem: item.pricePerItem,
        totalPrice: item.quantity * item.pricePerItem
      });
      itemsToBuy.splice(itemsToBuy.indexOf(item), 1);
    };
  }

})();
