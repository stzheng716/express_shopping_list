"use strict";

/** Routes for /items. */

const express = require("express");
const { isItemInList, validNewItem } = require("./middleware");
const {items, Item} = require("./fakeDb");
const router = new express.Router();


/** GET "/items": returns list of shopping items */
router.get("/", function(req, res) {
  return res.json({items:items});
});

/** POST "/items": adds items (JSON) and returns it*/
router.post("/", validNewItem, function(req, res) {
  const newItem = new Item(req.body.name, req.body.price);
  Item.add(newItem);

  return res.json({added:newItem});
});

/** GET for specific item from list and return item as JSON. */
router.get("/:name", isItemInList, function(req, res) {
  const item = Item.find(req.params.name)

  return res.json(item)
});

/** PATCH for specific item and return udpated item as JSON. */
router.patch("/:name", isItemInList, validNewItem, function(req, res) {
  const item = Item.find(req.params.name);
  item.name = req.body.name;
  item.price = req.body.price;

  return res.json({updated:item});
});

/** DELETE specific item and return confirmation  */
router.delete("/:name", isItemInList, function(req,res) {
  Item.delete(req.params.name);

  return res.json({message:"Deleted"});
})


module.exports = router;