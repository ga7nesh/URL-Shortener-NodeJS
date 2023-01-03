// create Url Shortner
const express = require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path');
const validUrl = require('valid-url');
const random = require('random');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// set public folder for assets
app.use(express.static(path.join(__dirname, 'public')));

// add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(require('./keys').mongoURI, { useNewUrlParser: true})
        .then(() => console.log('DB Connected'))
        .catch(err => console.log(err));

const ShortLink = require('./models/ShortLink');
// Home route
app.get('/', (req, res, next) => {
    ShortLink.countDocuments({})
             .then(count => {
                res.render('index', { 'total_links': count});
             })
             .catch(err => console.log(err));
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
// add short link
app.post('/short', (req, res, next) => {
    const url = req.body.url;

    if(validUrl.isUri(url)) {
        $short_link = '';
        for(let i = 0; i < 10; i++) {
            $short_link += String.fromCharCode(getRandomArbitrary(97, 122));
        }

        const newShortLink = new ShortLink({
            real_link: url,
            short_link: $short_link,
            ip: req.ip
        });

        newShortLink.save((err, newLink) => {
            if(err) {
                console.log(err);
            }else {
                return res.status(200).json(req.headers.host + "/" + "r/" + newLink.short_link);
            }
        });
    } else {
        res.status(400).json('Invalid URL');
    }
});

app.get('/r/:code',(req, res, next) => {
    ShortLink.findOne({short_link: req.params.code})
            .then(link => {
                res.redirect(link.real_link);
            })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});