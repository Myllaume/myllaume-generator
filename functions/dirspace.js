const fs = require('fs')
    , rimraf = require("rimraf")
    , config = require('../app').config

rimraf.sync(config.build_dir);
fs.mkdirSync(config.build_dir);