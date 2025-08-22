const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentification');

router.get('/details', auth.authenticateToken, (req, res, next) => {
    // Use Promise.all to wait for all queries to complete
    const categoryQuery = "select count(id) as categoryCount from category";
    const productQuery = "select count(id) as productCount from product";
    const billQuery = "select count(id) as billCount from bill";

    Promise.all([
        new Promise((resolve, reject) => {
            connection.query(categoryQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].categoryCount);
            });
        }),
        new Promise((resolve, reject) => {
            connection.query(productQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].productCount);
            });
        }),
        new Promise((resolve, reject) => {
            connection.query(billQuery, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].billCount);
            });
        })
    ])
    .then(([categoryCount, productCount, billCount]) => {
        const data = {
            category: categoryCount,
            product: productCount,
            bill: billCount
        };
        return res.status(200).json(data);
    })
    .catch((err) => {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Database error occurred' });
    });
});

module.exports = router;