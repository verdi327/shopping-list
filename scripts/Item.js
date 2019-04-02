'use strict';

const Item = (function(){
  
  class Item {
    constructor(name, completed=false){
      this.name = name.toLowerCase().trim();
      this.completed = completed;
    }
  }

  return Item;
}());