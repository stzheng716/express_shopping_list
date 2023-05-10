"use strict";

/** shopping cart app */

const express = require("express");
const { NotFoundError } = require("./expressError");
const app = express();

const itemsRoutes = require("./itemsRoutes");

app.use(express.json()); // using JSON

app.use("/items", itemsRoutes); // prefixed routes to "/items"

module.exports = app;