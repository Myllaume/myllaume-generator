const fs = require('fs')
    , config = require('../app').config
    , pug = require('pug');

function genCategory(posts) {
    for (let category of config.categories) {
        const catPosts = posts
            .filter(function(post) { return post.meta.categorie === category.id; })
            .map(function(post) { return {id: post.meta.id, title: post.meta.title}; })

        createPage(category, catPosts)
    }
}

function createPage(catMetas, catPosts) {
    const htmlRender = pug.compileFile('template/category.pug')({
        pathBase: '../',
        title: catMetas.title,
        description: catMetas.description,
        author: config.author,
        site_name: config.site_name,
        posts: catPosts.map(function(post) {
            return {id:post.id , title: post.title, categorie: catMetas.title}
        }),
        categories: config.categoriesList
    })

    fs.writeFile(config.build_dir + '/categories/' + catMetas.id + '.html', htmlRender, (err) => {
        if (err) { console.error( 'Err. write category index file: ' + err) }
    });
}

exports.genCategory = genCategory;