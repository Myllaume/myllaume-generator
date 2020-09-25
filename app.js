const fs = require('fs')
    , pckYaml = require('js-yaml');

const config = pckYaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
exports.config = config;

require('./functions/dirspace');
require('./functions/library');