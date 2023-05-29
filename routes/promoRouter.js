const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotion = require('../models/promotions');

const promoRouter = express.Router();

const factorX = 'promotion';
const factorY = 'Promotion';

// Create, Read, Delete => promotion
promoRouter.route('/')
    .get((req, res, next) => {
        Promotion.find({})
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then((promotion) => {
                console.log(`${factorY} Created`, promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /${factorX}s`);
    })
    .delete((req, res, next) => {
        Promotion.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

// Create, Read, Delete => promtion by Id
promoRouter.route(`/:${factorX}Id`)
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /${factorX}s/` + req.params.promotionId);
    })
    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Promotion.findByIdAndRemove(req.params.promotionId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

module.exports = promoRouter;