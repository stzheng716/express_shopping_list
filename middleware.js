"use strict";

const { items, itemObj, Item } = require("./fakeDb.js");
const { NotFoundError, BadRequestError } = require("./expressError");


/** check if item is in shopping list, if so continue else throw error */
function isItemInList(req, res, next) {
    if (Item.find(req.params.name)) {
      return next();
    } else {
      throw new NotFoundError("item not found");
    }
  }

function validNewItem(req, res, next) {
  if (req.body.name === undefined || req.body.price === undefined) {
    throw new BadRequestError(`request requires 'name' and 'price'`)
  } else {
    return next();
  }
}


module.exports = { isItemInList, validNewItem };