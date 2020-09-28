const fs = require('fs')
    , config = require('../app').config
    , path = require('path')
    , yamlFrontmatter = require('yaml-front-matter');

let library = {
    tempFiles: fs.readdirSync(config.library_source, 'utf8'),
    files: [],
    posts: [],
    pages: []
};

(function() {
    for (let ix = 0; ix < library.tempFiles.length; ix++) {
        const file = library.tempFiles[ix];
        if (path.extname(file) === '.md') {
            library.files.push(file); }
    }

    delete library.tempFiles
})();

(function() {
    for (let ix = 0; ix < library.files.length; ix++) {
        let file = library.files[ix];
        file = fs.readFileSync(config.library_source + file, 'utf8');
        file = yamlFrontmatter.loadFront(file);
        const content = file.__content;
        delete file.__content;
        const metas = file;

        if (metas.type === 'page') {
            library.pages.push({
                meta: metas,
                content: content
            });

            continue;
        }

        library.posts.push({
            meta: metas,
            content: content
        });
    }
})();

require('./gen_home').genHome(library.posts);
require('./gen_category').genCategory(library.posts);
require('./gen_post').genPost(library.posts);
require('./gen_page').genPage(library.pages);

require('./copydir').copyRecursiveSync('./assets', config.build_dir + '/assets');