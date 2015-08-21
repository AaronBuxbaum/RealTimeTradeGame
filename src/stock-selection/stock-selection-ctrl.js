StockSelection.controller('StockSelectionCtrl', function (DatabaseService) {
    var ctrl = this;

    ctrl.stocks = [
        {
            ticker: 'FDS',
            percent: 32,
            realName: 'FactSet'
        },
        {
            ticker: 'AAPL',
            percent: 50,
            realName: 'Apple'
        },
        {
            ticker: 'FB',
            percent: 2,
            realName: 'Facebook'
        }
    ];

    ctrl.calculateTotal = function () {
        return _.reduce(ctrl.stocks, function (total, value, key) {
            return total + value.percent;
        }, 0);
    };
    
    ctrl.getMax = function (curr) {
        return 100 - ctrl.calculateTotal() + curr;
    };
});