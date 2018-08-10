const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const morgan = require('morgan');
const postsController = require('./controllers/post');
app.use(bodyParser());
app.use(fileUpload());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev'));

app.use(cookieParser('pesho'));
app.use(express.static('/public/images'));

app.use(expressValidator());
app.use(expressSession({
  session: 'max', 
  saveUninitialized: false,
  resave: false,
  secret: "SUPERsekret",
}));
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')();
require('./config/routes')(app);

const portNumber = 8042;

// Register Handlebars view engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.use(express.static(__dirname));
app.set('view engine', '.hbs');


app.use((req, res, next) => {
  if (req.user) {
      res.locals.user = req.user;
  }
  next();
});

app.listen(portNumber, () => {
  console.log('Example app is running → PORT 8042');
});

var hbs = exphbs.create({
  helpers: {
    foo: () =>  "FOO!",
    bar: () => "BAR!"
  }
});

app.get('/', (req, res) => {
  console.log(req.user)
  res.render('index', {
    showTitle: true,
    user: this.author,
    anyArray: ["codergirl", "womanintech", "dodocodes"],
    helpers: {
      welcomeMessage: () => "Hello Everyone! Welcome to my Personal blog!", 
      contactMe: () => "Feel free to contact me!",
      img: '/images/codergirl.jpg'
    }
  });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
      showTitle: true,
      helpers: {
      }
    });
});

app.get('/test/:id', (req,res, next) =>{
  res.render('test', {
    output: req.params.id,
    user: this.author
  })
});
