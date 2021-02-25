const express = require("express");
const routes = express.Router();
const pool = require("./connections");

routes.get("/cart", (req, res) => {
  // pool.query('SELECT * FROM shopping_cart;'). then( (results) => {
  //   res.status(200);
  //   res.json(results.rows);
  // });
  const maxPrice = parseFloat(req.query.maxPrice);
  if (req.query.maxPrice) {
    pool
      .query("SELECT * FROM shopping_cart WHERE price <= $1", [maxPrice])
      .then((results) => {
        res.status(201);
        res.json(results.rows);
      });
  }

  if (req.query.prefix) {
    pool
      .query("SELECT * FROM shopping_cart WHERE product LIKE $1", [
        req.query.prefix + "%",
      ])
      .then((results) => {
        res.status(201);
        res.json(results.rows);
      });
  }
  const pageSize = parseFloat(req.query.pageSize);
  if (req.query.pageSize) {
    pool
      .query("SELECT * FROM shopping_cart LIMIT $1", [pageSize])
      .then((results) => {
        res.status(201);
        res.json(results.rows);
      });
  }
});

routes.get("/cart/:id", (req, res) => {
  const id = parseFloat(req.params.id);

  pool
    .query("SELECT * FROM shopping_cart WHERE id = $1", [id])
    .then((results) => {
      const matchingId = results.rows;
      if (matchingId.length < 1) {
        res.status(404).send(`ID Not Found`);
      }
      res.status(200);
      res.json(matchingId);
    });
});

routes.post("/cart", (req, res) => {
  const price = req.body.price;
  const quantity = req.body.quantity;
  const product = req.body.product;

  pool
    .query(
      "INSERT INTO shopping_cart (product, price, quantity) VALUES ($1, $2, $3);",
      [product, price, quantity]
    )
    .then((results) => {
      res.status(201);
      res.json(results.rows);
    });
});

routes.put("/cart/:id", (req, res) => {
  const id = parseFloat(req.params.id);
  const price = req.body.price;
  const quantity = req.body.quantity;
  const product = req.body.product;

  pool
    .query(
      "UPDATE shopping_cart SET product=$2 ,price=$3, quantity=$4  WHERE id = $1;",
      [id, product, price, quantity]
    )
    .then((results) => {
      res.status(200);
      res.json(results.rows);
    });
});

routes.delete("/cart/:id", (req, res) => {
  const id = parseFloat(req.params.id);

  pool.query("DELETE FROM shopping_cart WHERE id=$1", [id]).then(() => {
    res.status(204);
    res.json("");
  });
});

module.exports = routes;
