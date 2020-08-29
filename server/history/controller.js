const express = require('express');
const router = express.Router();
const db = require('../helpers/db');
const History = db.History;
router.post('/getAll', getAll);

function getAll(req, res, next) {
    History.find()
        .then((res) => res.status(200).json({}))
        .catch((err) => next(err));
}

module.exports = router;
