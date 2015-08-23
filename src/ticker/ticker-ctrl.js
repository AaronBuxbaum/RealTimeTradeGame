Ticker.controller('TickerCtrl', function ($interval, DatabaseService) {
    var ctrl = this;
    
    //Add a point
    ctrl.addPoint = function () {
        DatabaseService.addExamplePoints();
    };
    
    //Run the add point function every second
    $interval(ctrl.addPoint, 2500, 25);
    
    //Chart configuration
    ctrl.chartConfig = {
        options: {
            chart: {
                zoomType: 'x'
            },
            rangeSelector: {
                buttons: [
                    {
                        type: 'day',
                        count: 1,
                        text: 'Real Time',
                        dataGrouping: {
                            units: [['seconds', [1]]]
                        }
                    }, {
                        type: 'month',
                        count: 1,
                        text: 'Hour',
                        dataGrouping: {
                            units: [['minutes', [1]]]
                        }
                    }, {
                        type: 'month',
                        count: 3,
                        text: 'Day',
                        dataGrouping: {
                            units: [['day', [1]]]
                        }
                    }, {
                        type: 'year',
                        count: 1,
                        text: 'Week',
                        dataGrouping: {
                            units: [['week', [1]]]
                        }
                    }, {
                        type: 'all',
                        text: 'Month',
                        dataGrouping: {
                            units: [['month', [1]]]
                        }
                    }
                ]
            },
            navigator: {
                enabled: true
            }
        },
        series: ctrl.players,
        title: {
            text: ctrl.leagueName
        },
        useHighStocks: true
    };
});