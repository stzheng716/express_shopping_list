"use strict";

const { items, itemObj, Item } = require("./fakeDb.js");
const { NotFoundError } = require("./expressError");


/** check if item is in shopping list, if so continue else throw error */
function isItemInList(req, res, next) {
    if (Item.find(req.params.name)) {
      return next();
    } else {
      throw new NotFoundError("item not found");
    }
  }


module.exports = { isItemInList };