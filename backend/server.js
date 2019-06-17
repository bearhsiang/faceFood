import db from './fake_db'
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3001;
var fs = require('fs');
var uuidv4 = require('uuid/v4');

// from https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
var storeImg = (filename, dataString) => {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    // let type = matches[1];
    let data = matches[2];
    let out = `${filename}.png`;
    fs.writeFile(out, data, {encoding:'base64'}, err => {
        if(err)
            console.log(err);
        else
            console.log(`write to ${out}`);
    });
}
io.on('connection', function(socket){
    console.log('connect');
    socket.on('login', ({name, password}) => {
        let user = db.users.find(user => (user['name'] === name && user['password'] === password));
        let data = {
            status: user? 'Success':'Fail',
            msg: user? user.id: 'user not exists',
        }
        socket.emit('loginStatus', data);
        console.log(data);
    })
    socket.on('signup', ({name, password, email, figure}) => {
        let user = db.users.find(user => (user['name'] === name && user['email'] === email));
        if(user){
            socket.emit('signupStatus', {status:'failed', msg:'account exists'});
        }
        let user_id = uuidv4();
        let figure_id = 'default_figure'
        if(figure){
            figure_id = uuidv4();
            storeImg(figure_id, figure);
        }
        db.users.push({
            id: user_id,
            name: name,
            password: password,
            email: email,
            figure: figure_id,
        });
        socket.emit('signupStatus', {
            status: 'success',
            msg: user_id,
        });
    });
    socket.on('getUsers', (id) => {
        socket.emit('users', db.users);
    });
    socket.on('getPostsByUser', user_id => {
        socket.emit('posts', db.posts.filter(post => post.author === user_id));
    });
    socket.on('getPostByID', post_id => {
        socket.emit('post', db.post.filter(post => post.id === post_id));
    })
    socket.on('getImgByID', img_id => {
        console.log('get img '+img_id);
        fs.readFile(`${img_id}.png`, (err, data) => {
            if(err){
                socket.emit('imgError', 'no such img');
            }
            else{
                socket.emit('img', 'data:image/png;base64,'+data.toString('base64'));
            }
        })
    })
    socket.on('createPost', ({author, name, y, m, d, text, location, photolist, rate}) => {
        let post_id = uuidv4();
        let photo_id_list = photolist.map(photo => {
            let photo_id = uuidv4;
//             storeImg(photo_id, photo);
        })
        db.posts.push({
            id: post_id,
            author: author,
            name: name,
            y: y,
            m: m,
            d: d,
            text: text,
            location: location,
            photo: photo_id_list,
            rate: rate,
        })
    })

});
http.listen(port, () => {
    console.log(`server listen on port ${port}`);
});
