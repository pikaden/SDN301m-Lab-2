const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();
const factorX = 'dish';
const factorY = 'Dish';

// Create, Read, Delete => dish
dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log(`${factorY} Created`, dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /${factorX}es`);
    })
    .delete((req, res, next) => {
        Dishes.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

// Create, Read, Delete => dish by Id
dishRouter.route(`/:${factorX}Id`)
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /${factorX}es/` + req.params.dishId);
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

dishRouter.route(`/:${factorX}Id/comments`)
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                } else {
                    err = new Error(`${factorY} ` + req.params.dishId + ' not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    dish.comments.push(req.body);
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err))
                } else {
                    err = new Error(`${factorX} ` + req.params.dishId + ' not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /${factorX}es/` + req.params.dishId + '/comments');
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish != null) {
                    for (var i = dish.comments.length -1; i >=0 ; i--) {
                        dish.comments.id(dish.comments[i]._id).deleteOne();
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }, (err) => next(err))
                } else {
                    err = new Error(`${factorY} ` + req.params.dishId + ' not found');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })

module.exports = dishRouter;