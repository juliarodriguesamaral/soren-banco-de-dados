const express = require('express');
const router = express.Router();
const Place = require('./Place');
const Category = require('../categories/Category');
const slugify = require('slugify');

router.get('/admin/places', (req, res) => {

    Place.findAll({
        include: [{model: Category}]
    }).then(places => {
        res.render('admin/places/index', {places: places})
    })
});

router.get('/admin/places/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/places/new', {categories: categories})
    })
    
});

router.post('/places/save', (req, res) => {
    var nome = req.body.nome;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var cep = req.body.cep;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var category = req.body.category;

    Place.create({
        nome: nome,
        slug: slugify(nome),
        cidade: cidade,
        estado: estado,
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/places');
      })
    });

    router.post('/places/delete', (req, res) => {
        var id = req.body.id;
        if(id != undefined) {
            
            if(!isNaN(id)) {
    
                Place.destroy({
                    where: {
                        id: id
                    }
                }).then(()=> {
                    res.redirect('/admin/places');
                })
    
            } else { 
                res.redirect('/admin/places');
            }
        }else { 
            res.redirect('/admin/places')
        }
    });

module.exports = router;