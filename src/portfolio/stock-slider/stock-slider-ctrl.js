StockSlider.controller('StockSliderCtrl', function (PlayerService) {
    var ctrl = this;
    
    ctrl.getMax = PlayerService.getUnusedPercentage;
});