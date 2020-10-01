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
    }}).use(require('markdown-it-footnote'));

function genPost(posts) {

    for (let post of posts) {
        const htmlRender = pug.compileFile('template/post.pug')({
            pathBase: '../',
            title: post.meta.title,
            date_publish: post.meta.date_publish,
            date_update: (post.meta.date_update || post.meta.date_publish),
            keyword: post.meta.keyword,
            description: post.meta.description,
            author: config.author,
            site_name: config.site_name,
            content: pckMarkdownIt.render(post.content),
            categories: config.categoriesList
        })

        fs.writeFile(config.build_dir + '/posts/' + post.meta.id + '.html', htmlRender, (err) => {
            if (err) { console.error( 'Err. write post file: ' + err) }
        });
    }
}

exports.genPost = genPost;