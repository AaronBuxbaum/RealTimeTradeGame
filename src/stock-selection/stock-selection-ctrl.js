StockSelection.controller('StockSelectionCtrl', function (DatabaseService) {
    var ctrl = this;

    ctrl.stocks = [
        {
            ticker: 'F',
            percent: 8,
            realName: 'Ford'
        },
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
        },
        {
            ticker: 'USD',
            percent: 8,
            realName: 'U.S. Dollar'
        }
    ];

    ctrl.calculateMax = function () {
        return _.reduce(ctrl.stocks, function (total, value, key) {
            return total + value.percent;
        }, 0);
    };

    ctrl.max = ctrl.calculateMax();
});