const fs = require('fs')
    , rimraf = require("rimraf")
    , config = require('../app').config

rimraf.sync(config.export_path + config.site_name);

fs.mkdirSync(config.export_path + config.site_name);