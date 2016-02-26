angular.module('RealTimeTrade').factory('ToastService', function ($mdToast) {
  var svc = this;

  svc.toast = function(message, style) {
    $mdToast.show({
      template: '<md-toast><span flex style="font-weight: bold; ' + style + '">' + message + '</span></md-toast>'
    });
  }
  
  return svc;
});