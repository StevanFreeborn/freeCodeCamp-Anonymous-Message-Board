const runner = require('../test-runner');

module.exports = function (app) {
    const listener = app.listen(process.env.PORT || 3000, () => {
        console.log('Your app is listening on port ' + listener.address().port);
        if (process.env.NODE_ENV === 'test') {
            console.log('Running Tests...');
            setTimeout(() => {
                try {
                    runner.run();
                } catch (e) {
                    console.log('Tests are not valid:');
                    console.error(e);
                }
            }, 1500);
        }
    });
}