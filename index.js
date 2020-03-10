const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const connection = require('./database/database');



//controllers
const categoriesController = require('./models/categories/CategoriesController');
const placesController = require('./models/places/placesController');

//models
const Category = require('./models/categories/Category');
const Place = require('./models/places/Place');

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão DB com sucesso!')
    }).catch((error) => {
        console.log(error)
    })

app.use('/', categoriesController);
app.use('/', placesController);

app.get('/',(req, res) => {

    Place.findAll({
        include: [{model: Category}]
    }).then(places => {
        res.render('index', {places: places})
    });
    
});



app.get('/:slug', (req,res) => {
    var slug = req.params.slug;
    Place.findOne({
        include: [{model: Category}],
        where: {
            slug: slug
        }
    }).then(place => {
        if(place != undefined) {
            res.render('place', {place: place})
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
});



app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Place}],
    }).then(category => {
        if(category != undefined) {

            Category.findAll().then(categories => {
                res.render('index', {places: category.places, categories: categories})
            })

        }else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})


app.listen(3030, () => {
    console.log('Servidor rodando!')
});