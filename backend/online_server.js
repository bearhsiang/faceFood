// import db from './fake_db'
// import { addCatchUndefinedToSchema } from 'graphql-tools';
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3001;
var fs = require('fs');
// var uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const Img = require('./models/Img');

// from https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
// var storeImg = (filename, dataString) => {
//     let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

//     if (matches.length !== 3) {
//         return new Error('Invalid input string');
//     }

//     // let type = matches[1];
//     let data = matches[2];
//     let out = `${filename}.png`;
//     fs.writeFile(out, data, {encoding:'base64'}, err => {
//         if(err)
//             console.log(err);
//         else
//             console.log(`write to ${out}`);
//     });
// }
mongoose.connect('mongodb+srv://hsiang:test@cluster0-q7gvp.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
var online_db = mongoose.connection
online_db.on('error', error => {
    console.log(error);
})
online_db.once('open', () => {
    console.log('MongoDB connected!')
    io.on('connection', function(socket){
        console.log('connect');
        socket.on('login', ({name, password}) => {
            User.findOne({name: name, password: password},(error, user) => {
                if(error){
                    console.log('login error');
                    return;
                }
                let data = {
                    status: user? 'Success':'Fail',
                    msg: user? user._id: 'user not exists',
                }
                console.log(user);
                socket.emit('loginStatus', data);
                socket.broadcast.emit('loginStatus', data);
                console.log(data);
            });
        })
        socket.on('logout', () => {
            socket.emit('logoutStatus', {});
            socket.broadcast.emit('logoutStatus', {});
        })
        socket.on('signup', ({name, password, email, figure}) => {
            
            User.countDocuments({name: name}, (error, count) => {
                console.log(count);
                if(error){
                    console.log('error');
                }else if(count){
                    socket.emit('signupStatus', {status:'failed', msg:'account exists'});
                }else{
                    // console.log(figure);
                    Img.create({buffer: figure}, (err, img) => {
                        if(err){
                            console.log('img');
                            console.log(err);
                            return;
                        }
                        let newUser = {
                            // _id: user_id,
                            name: name,
                            password: password,
                            email: email,
                            figure: img._id,
                        }
                        User.create(newUser, (err, user) => {
                            if(err){
                                console.log('user');
                                console.log(err);
                                return
                            }
                            console.log(user);
                            socket.emit('signupStatus', {
                                status: 'success',
                                msg: user._id,
                            });
                        })
                    })
                }
            });
        });
        socket.on('getUsers', () => {
            User.find({}, (err, users) => {
                if(err){
                    console.log(err);
                    return;
                }
                socket.emit('users', users);
            });
        });
        socket.on('getPostsByUser', user_id => {
            Post.find({author: user_id}, (err, posts) => {
                // console.log(posts);
                let posts_id_list = posts.map(post => post._id);
                // console.log(posts_id_list);
                // socket.emit('posts', posts_id_list);
                socket.emit('posts', posts);
            })
        });
        socket.on('getPostByID', post_id => {
            console.log("getPostByID");
            Post.findById(post_id, (err, post) => {
                if(err){
                    console.log(err);
                    return;
                }
                socket.emit('post', post);
            })
        })
        socket.on('getImgByID', img_id => {
            Img.findById(img_id, 'buffer', (err, {buffer}) => {
                if(err){
                    console.log(err);
                    return;
                }
                socket.emit('img', buffer);
            })
        })
        socket.on('createPost', ({author, name, y, m, d, text, location, photo, rate}) => {
            let buf_list = photo.map(buf => ({buffer: buf}));
            Img.create(buf_list, (err, imgs) => {
                if(err){
                    console.log('img');
                    console.log(err);
                    return;
                }
                let newPost = {
                    author: author,
                    name: name,
                    y: y,
                    m: m,
                    d: d,
                    text: text,
                    location: location,
                    photo: imgs? imgs.map(img => img._id):[],
                    rate: rate,
                }
                Post.create(newPost, (err, post) => {
                    if(err){
                        console.log('post');
                        console.log(err);
                        return
                    }
                    console.log(post);
                })
            })
        })
        socket.on('want', (post_id, user_id) => {
            User.findById(user_id, (err, user) => {
                if(err){
                    console.log('want error');
                    console.log(err);
                }else{
                    if(!user){
                        console.log('want user not found');
                        return;
                    }
                    if(!(post_id in user.wantlist)){
                        user.wantlist.push(post_id);
                        user.save();
                    }
                }
            })
        })
        socket.on('getWantByUser', user_id => {
            User.findById(user_id, (err, user) => {
                if(err){
                    console.log('get Want by user error');
                    console.log(err);
                }
                if(!user){
                    console.log('user not exits');
                }
                socket.emit('wantlist', user.wantlist);
            })
        })
    });
});
http.listen(port, () => {
    console.log(`server listen on port ${port}`);
});
