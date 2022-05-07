const express = require('express');
const path = require('path');
const app = express();
const {create} = require('express-handlebars');
const morgan = require('morgan');
const override = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/passport');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main'
});

app.engine('.hbs', exphbs.engine);

app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(override('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.route'));
app.use(require('./routes/user.routes'));
module.exports = app;