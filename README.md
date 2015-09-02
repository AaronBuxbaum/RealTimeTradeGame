###To install:

1. Clone git repo
2. Run `npm install`. You may need to install `npm` from npmjs.com.
3. Build and deploy with `gulp deploy`. You may need to install `gulp` by running `npm install --global gulp`.
4. You can run the server independently of deployment scripts by simply running `gulp`.



###Updating dependencies:

1. Install `npm-check-updates`: `npm install --global npm-check-updates`.
2. Check for new dependencies: `ncu`.
3. If there are new dependencies: `ncu -u`.
	- Note that this could break some things in the system! This just keeps dependencies up-to-date.