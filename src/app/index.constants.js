/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('indianroom')
    .constant('malarkey', malarkey)
    .constant('datasource','http://smartrestaurantsolutions.com/mobileapi-test/Tigger.php')
    constant('restaurant_id','72')
    .constant('moment', moment);

})();
