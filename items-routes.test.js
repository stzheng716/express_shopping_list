"use strict";

const request = require("supertest");

const app = require("./app");
let {items, Item} = require("./fakeDb");

let water = new Item("water", "13.99");
let coke = {"name": "coke", "price":"12.99"};

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

    expect(resp.body).toEqual({"items": items});
  });
});

/** GET /items/:name - returns item with same name*/
describe("GET /items/:name", function() {
  it("Gets specific item", async function() {
    const resp = await request(app).get(`/items/water`);

    expect(resp.body).toEqual(water);
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

  /** PATCH /items/ - return all items from items array */
  describe("PATCH /items/water", function() {
    it("Gets specific item and update data", async function() {
      const resp = await request(app)
        .patch(`/items/water`)
        .send({
          name: "coke",
          price: "59.99"
        });

      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        "updated": {
          "name": "coke",
          "price": "59.99"
        }
      });
    });
    
    it("Returns error for invalid inputs", async function() {
      const resp = await request(app)
        .patch(`/items/coke`)
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

    /** DELETE /items/ - return delete message in JSON */
    describe("DELETE /items/water", function() {
      it("Gets specific item and delete item", async function() {
        const resp = await request(app)
          .delete(`/items/coke`)
          
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
          "message": "Deleted"
        });
      });
    
      it("Responds with 404 if item not in items array", async function() {
        const resp = await request(app).get(`/items/cat`);
    
        expect(resp.statusCode).toEqual(404);
      });
    
});


