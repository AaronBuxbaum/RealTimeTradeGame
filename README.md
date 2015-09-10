[![Build Status](https://travis-ci.org/AaronBuxbaum/RealTimeTradeGame.svg)](https://travis-ci.org/AaronBuxbaum/RealTimeTradeGame)

### To build:
1. Clone git repo
2. Run `npm install`. You may need to install `npm` from npmjs.com.
3. Build and deploy with `gulp deploy`. You may need to install `gulp` by running `npm install --global gulp`.

#### Visual Studio Code
If you are using [Visual Studio Code](https://code.visualstudio.com/), you will want to get Intellisense typings for all of the libraries that are in use.

1. Install the TypeScript Definition manager by running `npm install --global tsd`.
2. Build the `typings` directory by running `gulp install-tsd`.

#### Updating dependencies:
1. Install `npm-check-updates`: `npm install --global npm-check-updates`.
2. Check for new dependencies: `ncu`.
3. If there are new dependencies, update with: `ncu -u`. Note that this could break some things in the system! This just keeps dependencies up-to-date.


### Running server:
1. Build the server with `gulp build` if it has not already been built. Several files should now be within a directory named `build`.
2. Start the NodeJS server with `gulp`. Note that if port `8080` is not opened, you must define the environment variable `process.env.PORT` to an open port.
3. The application should now be running locally. Point your favorite browser to `localhost:8080` to access it.


### Testing:
RealTimeTradeGame uses [Karma](http://karma-runner.github.io/) for unit tests. You can test the application by running `gulp test`.

### Contributing:
If you wish to contribute, keep the following in mind:

1. Write Karma unit tests for any new functionality.
2. Ensure that all of the files for tests are included in `karma.conf.js`.
3. Run the tests such that they all pass.
4. Submit a pull request to the GitHub repository.
