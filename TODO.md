To Do:

Enhancements:
1. Make stock percentages in stocks/stocks.html equal to 100% total
2. Make stocks/add-new only pull NYSE stocks

Core Features:
1. Service that pulls the current values of the user's stock symbols
  - Should be parallelized
  - Multiply the percentages by the user's previous amount of money
    * ie. (1000 * 0.5 * 90) + (1000 * 0.5 * 5), where 1000 is the user's previous amount of money and has two stocks of 50% currently worth $90 and $5 respectively
  - Push the timestamp and collected total money to the user's stock timeline
  - Move this over to a node.js server process so that it can be disconnected
2. Database system -- how does the website communicate with the database?
3. Data -- how do we avoid having too much at any given time?
  - Perhaps with a nightly/weekly/monthly daemon that reduces down the data
4. User system
5. League system