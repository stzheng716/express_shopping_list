"use strict";

/** Routes for /items. */

const express = require("express");

const {items, Item} = require("./fakeDb");
const router = new express.Router();


/** GET "/items": returns list of shopping items */
router.get("/", function(req, res) {
  return res.json({items:items});
});

/** POST "/items": adds items (JSON) and returns it*/
router.post("/", function(req, res) {
  const newItem = new Item(req.body.name, req.body.price);

  Item.add(newItem);
  return res.json({added:newItem.self});
});

module.exports = router;