//Initialize variables
var PORTFOLIO_UPDATER;
var FETCH_INTERVAL = 15 * 1000;

//Node scripts
var batcher = require('./server-scripts/batcher.js');
var marketOpen = require('./server-scripts/market-open.js');
var updatePortfolio = require('./server-scripts/update-portfolio.js');

//Check the time
function checkTime() {
	if (marketOpen.isMarketOpen()) {
		startPortfolioUpdater();
	}
	else {
		stopPortfolioUpdater();
	}
}

//Start the portfolio updater
function startPortfolioUpdater() {
	if (PORTFOLIO_UPDATER) {
		return;
	}

	PORTFOLIO_UPDATER = setInterval(updatePortfolio.updatePortfolio, FETCH_INTERVAL);
	console.log('Portfolio updater started');
}

//Stop the portfolio updater
function stopPortfolioUpdater() {
	if (!PORTFOLIO_UPDATER) {
		return;
	}

	clearInterval(PORTFOLIO_UPDATER);
	PORTFOLIO_UPDATER = null;
	console.log('Portfolio updater stopped');

	batcher.dailyBatch(); //Kick off the daily batcher utility
}

checkTime();
setInterval(checkTime, FETCH_INTERVAL * 5);

//TEMPORARY
batcher.dailyBatch(); //Kick off the daily batcher utility