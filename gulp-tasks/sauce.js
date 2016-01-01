var sauceConnectLauncher = require('sauce-connect-launcher');

sauceConnectLauncher({
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY
}, function (err, sauceConnectProcess) {
    if (err) {
        console.error('ERROR');
        console.error(err.message);
        return;
    }
    console.log("Sauce Connect ready");

    sauceConnectProcess.close(function () {
        console.log("Closed Sauce Connect process");
    });
});