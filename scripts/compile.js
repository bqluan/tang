#!/usr/bin/env node
require('child_process').spawn('python',
  [
    './browser/deps/closure-library/closure/bin/build/closurebuilder.py',
    '--root=browser/deps/closure-library',
    '--root=browser/src',
    '--namespace=main',
    '--output_mode=compiled',
    '--compiler_jar=browser/deps/closure-compiler/compiler.jar',
    '--compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS',
    '--output_file=browser/target/index.js'
  ],
  {stdio: 'inherit'});
