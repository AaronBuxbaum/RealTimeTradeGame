To Do:

Enhancements:
1. Make stocks/add-new only pull NYSE stocks

Core Features:
1. Move the stock value server to a node.js server process so that it can be disconnected
2. Database system -- how does the website communicate with the database?
3. Data -- how do we avoid having too much at any given time?
  - Perhaps with a nightly/weekly/monthly daemon that reduces down the data
4. User system
5. League system

Bugs:
1. Sometimes the options in the list don't have values, which could cause problems if they're added to a portfolio