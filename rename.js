const fs = require('fs');

fs.readdir("build/static/js", (err, files) => {
    let regex1 = /main\.[0-9a-zA-Z]+\.chunk.js$/;
    let regex2 = /2\.[0-9a-zA-Z]+\.chunk.js$/;
    files.forEach(file => {
        console.log(typeof file);  
        if (regex1.test(file)) {
            console.log(file);
            fs.copyFileSync("build/static/js/" + file, "build/static/js/main.chunk.js");
        } else if (regex2.test(file)) {
            console.log(file);
            fs.copyFileSync("build/static/js/" + file, "build/static/js/2.chunk.js");
        }

    });
});

fs.readdir("build/static/css", (err, files) => {
    let regex1 = /main\.[0-9a-zA-Z]+\.chunk.css$/;
    files.forEach(file => {
        console.log(typeof file);  
        if (regex1.test(file)) {
            console.log(file);
            fs.copyFileSync("build/static/css/" + file, "build/static/css/main.chunk.css");
        } 
    });
});