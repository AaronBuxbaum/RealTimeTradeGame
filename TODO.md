To Do:

Core Features:
1. Finish stock value ticker in server.js
  - Find a way for the results of that ticker to interact in real-time with Angular
  - Once that's done, the ticker functionality in database-player-fact.js can be removed
2. Database system -- how does the website communicate with the database?
3. Data -- how do we avoid having too much at any given time?
  - Perhaps with a nightly/weekly/monthly daemon that reduces down the data
4. User system
5. League system

Bugs:
1. Sometimes the options in the list don't have values, which could cause problems if they're added to a portfolio
2. Font doesn't seem to be working properly