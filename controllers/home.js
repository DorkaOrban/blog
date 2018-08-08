const Post = require('../models').Post;

module.exports = {
    index: (req, res) => {
        res.render('home/index',
            {
                //posts,
                showTitle: true,
                welcomeMessage: "Welcome to my Blog!",
                img: '/images/glasses.jpg'
            }
        );
    }
};