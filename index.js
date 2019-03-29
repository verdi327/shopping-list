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
    this.store = [];
    this.showCompleted = true;
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  addItem(name){
    let item = this.store.find(item => item.name === name);
    if (item) {
      alert(`${name} already exists in your shopping list`);
      return;
    }
    let newItem = new Item(name);
    this.store.push(newItem);
  }
  
  removeItem(name){
    let filteredList = this.store.filter(item => item.name !== name);
    this.store = filteredList;
  }

  toggleComplete(name){
    let item = this.store.find(item => item.name === name);
    item.completed = !item.completed;
  }

  buildItemTemplate(item){
    let markComplete = item.completed ? 'shopping-item__checked' : '';

    return `<li>
      <span class="shopping-item ${markComplete}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
  }

  renderList() {
    let items;
    if (this.showCompleted) {
      items = this.store;
    } else {
      items = this.store.filter(item => !item.completed);
    }
    const htmlItems = items.map(item => this.buildItemTemplate(item)).join('\n');
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

function handleFormKeyboardSubmit(){
  $('.container').keypress(function (e) {
    if (e.which === 13) {
      $('form').submit();
      return false;
    }
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

function main() {
  handleFormClickSubmit();
  handleFormKeyboardSubmit();
  handleRemoveItem();
  handleToggleComplete();
  handleShowCompletedItems();
}

$(main);

