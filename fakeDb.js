const items = [];

class Item {
  /** construct an Item instance */
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this)
  }

  /** Add item to items list */
  static add(item) {
    items.push(item);
  }

  static findAll(){
    return items;
  }

  /** Return item object {name:name, price:price} */
  static get(item) {
    return item;
  }

  /** Loop through items and if searchItem is in items return item
   * else return false */
  static find(searchItem) {
    const foundItem = items.find(item => item.name === searchItem)
    if(foundItem){
      return foundItem
    }
    return false;
  }

  /** Loop through items to match name; splices items array to remove
   *  desired item
   */
  static delete(deleteItemName) {
    const index = items.findIndex(item => item.name === deleteItemName)
    console.log("index number:", index)
    if(index >= 0){
      items.splice(index, 1);
    }
  }
}

module.exports = { items, Item };