(function() {
  'use strict';

  angular
    .module('indianroom')
    .controller('OrderOnlineController', OrderOnlineController);

  /** @ngInject */
  function OrderOnlineController($timeout, webDevTec, toastr,$stateParams,$http,basket,$window,$filter,$location) {
    var vm = this;
    vm.classAnimation = '';
    vm.creationDate = 1457873297619;
    vm.category = [];
    vm.dishList =[];
    vm.total_amount =0.00;
    vm.total_item = 0;
    vm.relativeDate = moment(vm.creationDate).fromNow();
    /* vm.cartdata =  JSON.parse(basket.getCartData());*/
    if ($window.localStorage.getItem("cdata")) {
     vm.cartdata =  angular.fromJson($window.localStorage.getItem("cdata"));
     vm.total_amount = basket.cartTotalAmount();
     vm.total_item = basket.cartDataCounter();
    }
    if(basket.getRestaurantMenu() == null)
    {
        $http.get("http://smartrestaurantsolutions.com/mobileapi-test/Tigger.php?funId=19&rest_id=432",{cache: true}).success(function(data){
      //    console.log("from url");
          vm.category = data.app[0].category;
          vm.dishList = data.app[0].category[0].Dish_Information;
          basket.setRestaurantMenu(data);
        });
      }else {
        //  console.log(basket.getRestaurantMenu().app[0].category);
         vm.category = basket.getRestaurantMenu().app[0].category;
         vm.dishList = basket.getRestaurantMenu().app[0].category[0].Dish_Information;
      }

  vm.FillterByCategoryName = function(category)
  {
  //  alert(category);
    var filtered_data = $filter('filter')(basket.getRestaurantMenu().app[0].category,{Category_ID:category});
  //  console.log(filtered_data[0].Dish_Information);
    vm.dishList = filtered_data[0].Dish_Information;
  }

  /*add item into cartData*/

  vm.AddItemIntoCart = function(item_id,item_name,item_price)
{

      // This function add items into cart
      // Firstly, if items in cart > 0 then looping inside of cart data to identify whether new added item already exists or not.
      // if it's already available in cart then just unit amount of item & update the array.
      // otherwise, set new array object of item into cart data

    vm.cdata = {item_id: item_id,item_name: item_name,item_price: item_price,item_unit:1};
  //  console.log(vm.cdata);
    vm.isGet=0;
    if ($window.localStorage.getItem("cdata")) {
       vm.cartdata =  angular.fromJson(basket.getCartData());
        vm.cartdata.OrderList.forEach(function(e, i)
         {
            if (e.item_id==item_id)
            {
                vm.cdata = {item_id: item_id,item_name: item_name,item_price: item_price,item_unit:e.item_unit+1};
                basket.updateCartdata(i,vm.cdata);
                toastr.success(item_name+" added successfully!");
                vm.isGet=1;
                vm.total_amount = basket.cartTotalAmount();
            }
        });
        // if this new item not available in cart
           if(vm.isGet!=1)
          {
           basket.setCartData(vm.cdata);
           toastr.success(item_name+" added successfully!");

          }
     }else
     {
      // if no items in cart
         vm.cdata = {item_id: item_id,item_name: item_name,item_price: item_price,item_unit:1};
         basket.setCartData(vm.cdata);
        toastr.success(item_name+" added successfully!");
     }
  vm.cartdata =  angular.fromJson(basket.getCartData());
  vm.total_amount = basket.cartTotalAmount();
  vm.total_item = basket.cartDataCounter();
}

vm.increaseQuantity = function(item_id)
{
  basket.cartIncreaseQuantity(item_id);
  vm.cartdata =  angular.fromJson(basket.getCartData());
  vm.total_amount = basket.cartTotalAmount();
  vm.total_item = basket.cartDataCounter();
}
vm.minusQuantity = function(item_id)
{
  basket.cartMinusQuantity(item_id);
  vm.cartdata =  angular.fromJson(basket.getCartData());
  vm.total_amount = basket.cartTotalAmount();
  vm.total_item = basket.cartDataCounter();
}
vm.gotoCheckoutProcess = function()
{
  $location.path("/login");
}
  }

})();
