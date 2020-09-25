const fs = require('fs')
    , pckYaml = require('js-yaml');

let config = pckYaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
config.build_dir = config.export_path + config.site_name;
exports.config = config;

require('./functions/dirspace');
require('./functions/library');