"use strict";

const request = require("supertest");

const app = require("./app");
let {items, Item} = require("./fakeDb");

let water = new Item("water", "13.99");

/** Add water Item before each test */
beforeEach(function() {
  Item.add(water);
});

/** Delete water Item after each test */
afterEach(function() {
  Item.delete("water");
})

/** GET /items/ - return all items from items array */
describe("GET /items", function() {
  it("Gets all items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({"items": [{"name":"water",
                                          "price":"13.99"
                                        }]
                                      });
  });
});

/** GET /items/:name - returns item with same name*/
describe("GET /items/:name", function() {
  it("Gets specific item", async function() {
    const resp = await request(app).get(`/items/water`);

    expect(resp.body).toEqual({"name":"water", "price":"13.99"});
  });

  it("Responds with 404 if item not in items array", async function() {
    const resp = await request(app).get(`/items/cat`);

    expect(resp.statusCode).toEqual(404);
  });

});

/** POST /items - returns newly inputted items */
describe("POST /items", function() {
  it("Creates new item successfully with valid input", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name:"coke",
        price:"59.99"
      });

      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        added: {
          name: "coke",
          price: "59.99"
        }
      });
  });

  it("Returns error for invalid inputs", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        label:"coke",
        price:"59.99"
      });

      expect(resp.statusCode).toEqual(400);
      expect(resp.body).toEqual({
        error: {
          message: "request requires 'name' and 'price'",
          status: 400
        }
      })
  });

});

