suiteplus-prova
============

Required for build
----------
 - install node.js: http://nodejs.org/

pre-build
----------
    npm install grunt-cli -g

build
----------
    # install all projects dependecies for build
    npm install
    # install all front-end dependencies for app
    bower install
    # generate pack for distribution
    grunt release
