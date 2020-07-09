(function(){

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
    // .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
      items: '<',
      beacon: '<',
      onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'ctrl',
      bindToController: true
        };

    return ddo;
    }

    function FoundItemsDirectiveController() {
        var ctrl = this;
        ctrl.checkEmptiness = function(){
            if(ctrl.items.length === 0){
                return true;
            } if (ctrl.items.length > 0){
                return false;
            }
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var ctrl = this;
        ctrl.found = [];
        ctrl.searchTerm = "";
        ctrl.beacon = false;
        ctrl.NarrowDown = function (searchTerm){
            if ((ctrl.searchTerm.replace(/\s/g, "").length == 0)){
                ctrl.found = [];
                ctrl.beacon = true;
            } else {
            var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

            promise.then(function (response){
                ctrl.found = response;
                ctrl.beacon = true;

            })
    
            .catch(function (error){
                console.log(error);
                ctrl.beacon = true;
            })
        }
        };
        ctrl.removeItem = function (itemIndex){
            ctrl.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http){
        var service = this;
        var fItems = [];
        var descr = "";
    service.getMatchedMenuItems = function (searchTerm) {
         
        return $http({
          method: "GET",
          url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function(result){

            fItems = [];
            for (var i = 0; i < result.data.menu_items.length; i++) {
            descr = result.data.menu_items[i].description.toLowerCase();
            if (descr.search(searchTerm) !== -1) {
        var item = {
        name: result.data.menu_items[i].name,
        short_name: result.data.menu_items[i].short_name,
        description: result.data.menu_items[i].description
      }; 
      fItems.push(item);     
    }
    };
    return fItems;
    })
    .catch(function (error) {
        console.log("Something went terribly wrong.");
    });
    };

    service.getfItems = function(){
        return fItems;
    };

    service.removeItem = function(itemIndex){
        fItems.splice(itemIndex, 1);
    };
    }
})();
