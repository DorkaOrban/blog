const passport = require('passport');

module.exports = {
    index: (req, res) => {
        res.render('home/index',
            {
                headerTitle: 'Welcome to my personal blog!',
                headerSubtitle: 'lorem ipsum dolor sit amet',
                headerDescription: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
                aboutMe: 'ABOUT ME',
                description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
                readMore: 'READ MORE',
                testButton: 'Click me',
                goToLogin: 'GO TO LOGIN',
                showTitle: true,
                message: "Did you heard the news?",
                img: '/images/glasses.jpg'
            }
        );
    }
};
