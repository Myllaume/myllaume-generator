const fs = require("fs")
    , path = require("path")

// from https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

exports.copyRecursiveSync = copyRecursiveSync;