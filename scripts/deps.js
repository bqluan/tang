#!/usr/bin/env node
require('child_process').spawn('python',
  [
    'browser/deps/closure-library/closure/bin/build/depswriter.py',
    '--root_with_prefix=browser/src ../../../../src',
    '--output_file=browser/src/deps.js'
  ],
  {stdio: 'inherit'});
