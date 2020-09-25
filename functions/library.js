const fs = require('fs')
    , config = require('../app').config
    , path = require('path')
    , yamlFrontmatter = require('yaml-front-matter')
    , pug = require('pug');

let library = {
    tempFiles: fs.readdirSync(config.library_source, 'utf8'),
    files: [],
    posts: []
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

        library.posts.push({
            meta: metas,
            content: content
        });
    }
})();

const htmlRender = pug.compileFile('template/home.pug')({
    title: 'toto',
    description: 'lorem ipsum',
    author: config.author,
    site_name: config.site_name,
    posts: library.posts.map(function(post) {
        return {id:post.meta.id , title: post.meta.title, categorie: post.meta.categorie}
    })
})

console.log(htmlRender)