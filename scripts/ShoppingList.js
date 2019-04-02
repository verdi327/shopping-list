'use strict';
/* global Item */

const ShoppingList = (function() {

  const SHOPPING_LIST_DISPLAY = $('.shopping-list');

  class ShoppingList {
    constructor(){
      this.store = localStorage.getItem('shopping-list') ? JSON.parse(localStorage.getItem('shopping-list')) : [];
      this.showCompleted = true;
    }

    save() {
      localStorage.setItem('shopping-list', JSON.stringify(this.store));
    }

    toggleShowCompleted() {
      this.showCompleted = !this.showCompleted;
    }

    addItem(name){
      if (!name) return;

      const newItem = new Item(name);
      const item = this.store.find(item => item.name === newItem.name);

      if (item) {
        alert(`${name} already exists in your shopping list`);
        return;
      }
      this.store.push(newItem);
      this.save();
    }
    
    removeItem(name){
      const itemIdx = this.store.findIndex(item => item.name === name);
      this.store.splice(itemIdx, 1);
      this.save();
    }

    toggleComplete(name){
      const item = this.store.find(item => item.name === name);
      item.completed = !item.completed;
      this.save();
    }

    reset() {
      localStorage.clear();
      this.store = [];
    }

    editItem(name, newName) {
      if (!newName) return;
      
      const existingItem = this.store.find(item => item.name === newName);
      if (existingItem) {
        alert(`An item named ${newName} already exist. Please choose another name`);
        return;
      }
      const item = this.store.find(item => item.name === name);
      item.name = newName;
      this.save();
    }

    buildItemTemplate(item){
      const markComplete = item.completed ? 'shopping-item__checked' : '';

      return `<li>
        <span class="shopping-item ${markComplete}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
          <button class="shopping-item-edit">
            <span class="button-label">edit</span>
          </button>
        </div>
      </li>`;
    }

    renderList(searchString=null) {
      let items;
      if (this.showCompleted) {
        items = this.store;
      } else {
        items = this.store.filter(item => !item.completed);
      }

      if (searchString) {
        searchString = searchString.toLowerCase();
        items = items.filter(item => {
          return item.name.slice(0, searchString.length) === searchString;
        });
      }

      const htmlItems = items.map(this.buildItemTemplate); 
      SHOPPING_LIST_DISPLAY.html(htmlItems);
    }
  }

  return ShoppingList;

}());