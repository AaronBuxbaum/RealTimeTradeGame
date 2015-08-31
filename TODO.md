Core Features:
1. Rethink how the league system works. Think about how the system works in regard to monetization.
	- Players should be able to create as many leagues as they'd like and invite friends (joining random leagues probably isn't super interesting)
	- You should have to pay to enter, which will have a minimum value per player
	- Minimum amount required to enter depends on the length of the league
	- At the end of the league, 95% of the entered bids go to the winner of the league, the rest goes to me
2. Cut down on data/bandwdith requirements
	- Smarter use of Firebase specific functionality, ie. "ref.child('events').child('20150829').orderByChild('timestamp').limitToLast(100)"
	- Flatten Firebase structure for robustness
	- Angular's limit() function as it can be used



Bugs:
1. Some stocks don't work via Google's system, which causes major issues



Leagues:
1. Creating a League -- ideas
	- How does the initial person get to this point?
	- Creates a league by giving it some basic information: name, end date, length of run, max number of players, etc
		- Also should store internal data like creator's user ID and creation date
	- Allow the creator to invite friends over email to join the league
	- During this time, all you can do is essentially look at the "pending" screen and see who has joined
	- Other players can join in during this time
	- Once the desired number of players have joined in, the creator can click "Go"
		- Players have to pay in before it can begin
		- Server logs the start time and end time (start time + length of run)
		- Players can now see the tickers and portfolios and such



Leagues:
3. Creating a league needs to be able to take in more information -- name, id, end date, etc
	- Also should store internal data like start date and creating user ID
4. Need a server script that handles closing a league when the timer runs out
5. There should be a pre-league system where you collect your players before beginning to play



Ticker:
1. There should be a checkbox to allow hiding/showing certain league players