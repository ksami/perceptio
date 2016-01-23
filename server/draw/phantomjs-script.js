var system = require('system');
var page = require('webpage').create();


if (system.args.length === 3) {
  console.log('Try to pass some args when invoking this script!');
} else {
  page.viewportSize = {
    width: system.args[1],
    height: system.args[2]
  };
  page.content = system.args[3];
  page.render('d3.png');

  // var results = 'data:image/png;base64,' + page.renderBase64('d3test.png');
  // system.stdout.write(results);
}


// page.content = '<html><body><canvas id="surface"></canvas></body></html>';


phantom.exit();