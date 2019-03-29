'use strict';

const SHOPPING_LIST_DISPLAY = $('.shopping-list');

class Item {
  constructor(name, completed=false){
    this.name = name.toLowerCase().trim();
    this.completed = completed;
  }
}

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
    const filteredList = this.store.filter(item => item.name !== name);
    this.store = filteredList;
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

    // don't call functions, you give them to other functions who call them
    const htmlItems = items.map(this.buildItemTemplate); 
    SHOPPING_LIST_DISPLAY.html(htmlItems);
  }
}

const shoppingList = new ShoppingList();

function handleFormClickSubmit(){
  $('form').on('submit', function(event) {
    event.preventDefault();
    const input = $(this).find('input');
    const itemName = input.val();
    shoppingList.addItem(itemName);
    shoppingList.renderList();
    input.val('');
  });
}

function handleRemoveItem() {
  $('.container').on('click', '.shopping-item-delete', function(event) {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    shoppingList.removeItem(listItem);
    shoppingList.renderList();
  });
}

function handleToggleComplete() {
  $('.container').on('click', '.shopping-item-toggle', function(event) {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    shoppingList.toggleComplete(listItem);
    shoppingList.renderList();
  });
}

function handleShowCompletedItems() {
  $('.container').on('change', '#show-completed-items', function(event) {
    shoppingList.toggleShowCompleted();
    shoppingList.renderList();
  });
}

function handleEditItem() {
  $('.container').on('click', '.shopping-item-edit', function(event) {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    const newName = prompt('Please enter a new item name');
    shoppingList.editItem(listItem, newName);
    shoppingList.renderList();
  });
}

function handleListFiltering() {
  $('#shopping-list-filter').on('keyup', function(event) {
    const searchString = $(event.target).val();
    shoppingList.renderList(searchString);
  });
}

function handleClearList() {
  $('.container').on('click', 'button[name="clear-list"]', function(event) {
    shoppingList.reset();
    shoppingList.renderList();
  });
}

function main() {
  shoppingList.renderList();
  handleFormClickSubmit();
  handleRemoveItem();
  handleToggleComplete();
  handleShowCompletedItems();
  handleEditItem();
  handleListFiltering();
  handleClearList();
}

$(main);

