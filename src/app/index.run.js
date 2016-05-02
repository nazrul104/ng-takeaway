(function() {
  'use strict';

  angular
    .module('indianroom')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
