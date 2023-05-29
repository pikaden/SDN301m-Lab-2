const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leader = require('../models/leaders');

const leaderRouter = express.Router();

const factorX = 'leader';
const factorY = 'Leader';

// Create, Read, Delete => leader
leaderRouter.route('/')
    .get((req, res, next) => {
        Leader.find({})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Leader.create(req.body)
            .then((leader) => {
                console.log(`${factorY} Created`, leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /${factorX}s`);
    })
    .delete((req, res, next) => {
        Leader.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

// Create, Read, Delete => leader by Id
leaderRouter.route(`/:${factorX}Id`)
    .get((req, res, next) => {
        Leader.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /${factorX}s/` + req.params.leaderId);
    })
    .put((req, res, next) => {
        Leader.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leader.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

module.exports = leaderRouter;