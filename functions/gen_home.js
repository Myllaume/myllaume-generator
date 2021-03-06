const fs = require('fs')
    , config = require('../app').config
    , pug = require('pug');

function genHome(posts) {
    const htmlRender = pug.compileFile('template/home.pug')({
        pathBase: './',
        title: 'Accueil site de Guillaume Brioudes',
        keyword: [],
        description: config.description,
        author: config.author,
        site_name: config.site_name,
        posts: posts.map(function(post) {
            return {id:post.meta.id , title: post.meta.title, categorie: post.meta.categorie}
        }),
        categories: config.categoriesList
    })

    fs.writeFile(config.build_dir + '/index.html', htmlRender, (err) => {
        if (err) { console.error( 'Err. write home index file: ' + err) }
    });
}

exports.genHome = genHome;