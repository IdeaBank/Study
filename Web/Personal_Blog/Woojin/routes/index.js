'use strict';

let express = require('express');
let router = express.Router();
let fs = require('fs')


let jsonReader = function (filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

/* GET home page. */
router.get('/', function (req, res, next) {

    let data = new Array();

    let raw_data = fs.readFileSync('./public/json/category_list.json');
    let categories = JSON.parse(raw_data);

    data.push(categories);

    data.push({ "articles": [] });

    for (let i = 0; i < categories.category_list.length; ++i) {

        raw_data = fs.readFileSync('./public/json/categories/' + categories.category_list[i].link + '/' + categories.category_list[i].link + '.json');
        let article_data = JSON.parse(raw_data);

        for (let j = 0; j < article_data.articles.length; ++j)
            data[1].articles.push(article_data.articles[j]);
    }

    let customSort = function (a, b) {
        if (a.written == b.written) { return 0 } return a.written > b.written ? 1 : -1;
    }

    data[1].articles.sort(customSort);


    res.render('index', { title: 'Woojin\'s Personal Blog', data: data });

});

router.get('/board/:category_name', function (req, res, next) {

    let data = new Array();

    let raw_data = fs.readFileSync('./public/json/category_list.json');
    let categories = JSON.parse(raw_data);

    data.push(categories);

    data.push({ "articles": [] });

    raw_data = fs.readFileSync('./public/json/categories/' + req.params.category_name + '/' + req.params.category_name + '.json');
    let article_data = JSON.parse(raw_data);

    for (let j = 0; j < article_data.articles.length; ++j)
        data[1].articles.push(article_data.articles[j]);

    let customSort = function (a, b) {
        if (a.written == b.written) { return 0 } return a.written > b.written ? 1 : -1;
    }

    data[1].articles.sort(customSort);

    res.render('index', { title: 'Woojin\'s Personal Blog', data: data });
});

router.get('/article/:article_number', function (req, res, next) {


    let data = new Array();

    let raw_data = fs.readFileSync('./public/json/category_list.json');
    let categories = JSON.parse(raw_data);

    data.push(categories);

    data.push({ "articles": [] });

    for (let i = 0; i < categories.category_list.length; ++i) {

        raw_data = fs.readFileSync('./public/json/categories/' + categories.category_list[i].link + '/' + categories.category_list[i].link + '.json');
        let article_data = JSON.parse(raw_data);

        for (let j = 0; j < article_data.articles.length; ++j)
            data[1].articles.push(article_data.articles[j]);

    }

    let checkFlag = false;

    for (let i = 0; i < data[1].articles.length; ++i) {
        if (data[1].articles[i].written.toString() == req.params.article_number) {
            checkFlag = true;
        }
    }


    if (checkFlag)
        res.render('article', {});
    else
        res.render('notFound');
});

router.get('*', function (req, res, next) {
    res.render('notFound');
});

module.exports = router;