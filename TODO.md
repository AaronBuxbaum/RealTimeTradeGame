To Do:

Core Features:
1. Polish and increase features for single user
2. Daily/weekly/monthly daemons that cut down the data requirements
3. Cut down on bandwidth use with firebase specific functionality or Angular's limit() functions

Bugs:
1. Some stocks don't work via Google's system, which causes major issues

Leagues:
1. You should see your ticker start working immediately after joining a league
	- Currently it requires a refresh to update the auth status
2. You should be able to join only one league at a time (for now)
3. You should be able to see the league that you are in
4. Creating a league needs to be able to take in more information -- name, id, etc
5. More information should be stored on leagues, such as start date, end date, etc
6. Leagues with end dates should have a countdown displayed
	- A server script will have to be implemented that handles closing the league when the timer runs out

Ticker:
1. There should be a checkbox to allow hiding/showing certain league players