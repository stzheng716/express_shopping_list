const items = [];

class Item {
  /** construct an Item instance */
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.self = {name: name, price: price};
  }

  /** Add item to items list */
  static add(item) {
    items.push(item.self);
  }

  /** Return item.self object {name:name, price:price} */
  static get(item) {
    return item.self;
  }

  /** Loop through items and if searchItem is in items return item 
   * else return false */
  static find(searchItem) {
    for(let item of items){
      if(item.name === searchItem) {
        return item;
      }
    }
    return false;
  }

}
module.exports = { items, Item };