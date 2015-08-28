StockSlider.controller('StockSliderCtrl', function (PortfolioService) {
    var ctrl = this;
    
    ctrl.getMax = PortfolioService.getUnusedPercentage;
});