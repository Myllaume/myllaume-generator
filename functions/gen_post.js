const fs = require('fs')
    , config = require('../app').config
    , pug = require('pug')
    , pckHljs = require('highlight.js')
    , pckMarkdownIt = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && pckHljs.getLanguage(lang)) {
            try {
                return pckHljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return '';
    }});

function genPost(library) {

    for (let post of library.posts) {
        const htmlRender = pug.compileFile('template/post.pug')({
            pathBase: './',
            title: post.meta.title,
            description: post.meta.description,
            author: config.author,
            site_name: config.site_name,
            content: pckMarkdownIt.render(post.content),
            categories: config.categories.map(function(category) {
                return {id:category.id , title: category.title}
            })
        })

        fs.writeFile(config.build_dir + '/posts/' + post.meta.id + '.html', htmlRender, (err) => {
            if (err) { console.error( 'Err. write post file: ' + err) }
        });
    }
}

exports.genPost = genPost;