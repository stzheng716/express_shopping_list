"use strict";

/** Routes for /items. */

const express = require("express");
const { isItemInList } = require("./middleware");

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

/** GET for specific item from list and return item as JSON. */
router.get("/:name", isItemInList, function(req, res) {
  const item = Item.find(req.params.name)
  return res.json(item)
});

/** GET for specific item and return item as JSON. */
router.patch("/:name", isItemInList, function(req, res) {
  const item = Item.find(req.params.name);
  item.name = req.body.name;
  item.price = req.body.price;
  console.log(item.self)
  return res.json({updated:item});
});


module.exports = router;