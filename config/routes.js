const userController = require('../controllers/user');
const homeController = require('../controllers/home');
const postController = require('../controllers/post');
const Post = require('../models').Post;

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/posts/create', postController.createGet);
    app.post('/posts/create', postController.createPost);
    
    app.get('/posts/details/:id',postController.details);

    app.get('/posts', (req, res) => {
        Post.findAll({ limit: 6}).then(posts =>{
            res.render('posts',{posts: posts});
        })
    });
};