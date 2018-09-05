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

    app.get('/user/logout', userController.loggedIn, userController.logout);

    app.get('/posts/create', userController.loggedIn, postController.createGet);
    app.post('/posts/create', userController.loggedIn, postController.createPost);
    app.get('/posts/details/:id', postController.details);

    app.get('/posts', (req, res) => {
        Post.findAll({ limit: 9, order:[['createdAt', 'DESC']] }).then(posts =>{
            res.render('posts',{
                posts, 
                img: '/images/glasses.jpg',
                user: typeof req.user !== 'undefined'? req.user.username : null
            }
            );
        });
    });

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    });
};