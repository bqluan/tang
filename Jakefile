var cucumber = require('cucumber');

task('features', function() {
  cucumber.Cli(['', '', '--format', 'pretty']).run(function(succeeded) {
    if (!succeeded) fail('task "features" fails');
  });
});
