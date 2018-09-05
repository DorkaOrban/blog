const Post = require('../models').Post;
const multer = require('multer');


module.exports = {
 createGet: (req, res) => {
    res.render('posts/create', {
        user: typeof req.user !== 'undefined'? req.user.username : null
    });
 },

 createPost: (req, res) => {
        let articleArgs = req.body;
        
        let errorMsg = '';
        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to make articles!'
        } 
        if(typeof articleArgs !== 'undefined'){

            if (!articleArgs.title) {
                errorMsg = 'Invalid title!';
            } else if (!articleArgs.content) {
                errorMsg = 'Invalid content!';
            }
           
            if (errorMsg) {
                res.render('posts/create', {
                    error: errorMsg,
                    user: typeof req.user !== 'undefined'? req.user.username : null
                });
                return;
            }
            articleArgs.authorId = typeof req !== 'undefined' && req.user.id  !== 'undefined' ? req.user.id : 1;
            articleArgs.date = Date.now();
            articleArgs.author = typeof req !== 'undefined' ? req.user.fullName : "Dodocodes";
            console.log('req.files', req.files.img)
            let image = req.files.img;
            image.mv('./images/uploads/'+image.name, (err) => {
                if (err){
                    console.log('error', err);
                    return;
                }
                console.log("UPLOADED YEEEEEAH ");
            });

            let postObject = {
                title: articleArgs.title,
                content: articleArgs.content,
                date: articleArgs.date,
                author: articleArgs.author,
                img: image.name,
            };

            Post.create(postObject).then(article => {
                res.redirect('/posts');
            });
        }
 },

 details: (req,res) => {
        let id = req.params.id;
        Post.findById(id).then(article => {
            res.render('posts/details',{
                dataValues: article.dataValues, 
                user: typeof req.user !== 'undefined'? req.user.username : null
            })
        })
 }
};
