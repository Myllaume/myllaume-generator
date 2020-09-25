const fs = require('fs')
    , config = require('../app').config
    , pug = require('pug');

function genHome(library) {
    const htmlRender = pug.compileFile('template/home.pug')({
        title: 'Accueil site de Guillaume Brioudes',
        description: config.description,
        author: config.author,
        site_name: config.site_name,
        posts: library.posts.map(function(post) {
            return {id:post.meta.id , title: post.meta.title, categorie: post.meta.categorie}
        })
    })

    fs.writeFile(config.build_dir + '/index.html', htmlRender, (err) => {
        if (err) { console.error( 'Err. write home index file: ' + err) }
    });
}

exports.genHome = genHome;