(function () {
  angular.module('ShoppingListCheckOff',[])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

          //To buy list
         	ToBuyController.$inject =['ShoppingListCheckOffService'];
         	function ToBuyController (ShoppingListCheckOffService)
          {
         		var buy = this;
         		buy.items = ShoppingListCheckOffService.toBuyItems();
         		buy.removeItem = function(itemIndex){
         			ShoppingListCheckOffService.bought(itemIndex);
         		};
         	}

          //Already bought list
        	AlreadyBoughtController.$inject =['ShoppingListCheckOffService'];
        	function AlreadyBoughtController (ShoppingListCheckOffService)
          {
        		var bought = this;
        		bought.items = ShoppingListCheckOffService.boughtItems();
        	}

          //Shopping list service
        	function ShoppingListCheckOffService()
          {
        		var service = this;
            var toBuyItems =
            [
              {name: "Cookies",
               quantity: 10
              },
              {name: "Chocolate",
               quantity: 3
              },
              {name: "Notebook",
               quantity: 5
              },
              {name: "Pens",
               quantity: 12
              },
              {name: "iPhones 7",
               quantity: 4
              },
              {name: "MK bag",
               quantity: 1
              },
              {name: "Laptop",
               quantity: 4
              },
              {name: "Potato",
               quantity: 8
              },
              {name: "Rings",
               quantity: 2
              },
              {name: "Tissues",
               quantity: 90
              },
              {name: "Glasses",
               quantity: 17
              }
            ];

        		var boughtItems = [];

          	service.bought = function(itemIndex) {
          			boughtItems.push(toBuyItems[itemIndex]);
          			toBuyItems.splice(itemIndex, 1);
          	};

          	service.boughtItems = function() {
          			return boughtItems;
          	};

          	service.toBuyItems = function() {
          			return toBuyItems;
          	};
          }

})();