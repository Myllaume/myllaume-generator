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

function genPage(pages) {

    for (let page of pages) {
        const htmlRender = pug.compileFile('template/post.pug')({
            pathBase: './',
            title: page.meta.title,
            description: page.meta.description,
            author: config.author,
            site_name: config.site_name,
            content: pckMarkdownIt.render(page.content),
            categories: config.categoriesList
        })

        fs.writeFile(config.build_dir + '/' + page.meta.id + '.html', htmlRender, (err) => {
            if (err) { console.error( 'Err. write page file: ' + err) }
        });
    }
}

exports.genPage = genPage;