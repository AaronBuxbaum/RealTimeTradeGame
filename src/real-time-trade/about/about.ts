/**
* @ngdoc directive
* @name RealTimeTrade.About.component:about
* @element about
* @scope
*
* @description
* A button that opens a dialog with developer information.
**/
angular.module('RealTimeTrade.About').component('about', {
		templateUrl: 'real-time-trade/about/about.html',
		controller: 'AboutCtrl'
});

/**
* @example
*	<example module="aboutExample">
*	  <file name="index.html">
*	    <about></about>
*	  </file>
*	  <file name="main.js">
*	    angular.module('aboutExample', ['About']);
*	  </file>
*	</example>
**/