'use strict';

const SHOPPING_LIST_DISPLAY = $('.shopping-list');

class Item {
  constructor(name, completed=false){
    this.name = name;
    this.completed = completed;
  }
}

class ShoppingList {
  constructor(){
    this.store = [];
  }

  addItem(name){
    let newItem = new Item(name);
    this.store.push(newItem);
  }
  
  removeItem(name){
    let filteredList = this.store.filter(item => item.name !== name);
    this.store = filteredList;
  }

  markComplete(name){
    this.store = this.store.map(item => {
      if (item.name === name) {
        item.completed = true;
      }
      return item;
    });
  }

  markIncomplete(name){
    this.store = this.store.map(item => {
      if (item.name === name) {
        item = {name: name, completed: false};
      }
      return item;
    });
  }

  buildItemTemplate(item){
    console.log('build', item);
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

  renderList(){
    const htmlItems = this.store.map(item => this.buildItemTemplate(item)).join('\n');
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

function handleMarkItemComplete() {
  $('.container').on('click', '.shopping-item-toggle', function(event) {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    shoppingList.markComplete(listItem);
    shoppingList.renderList();
  });
}

function handleMarkItemIncomplete() {
  $('.container').on('click', '.shopping-item-toggle', function(event) {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    shoppingList.markIncomplete(listItem);
    shoppingList.renderList();
  });
}

function main() {
  handleFormClickSubmit();
  handleFormKeyboardSubmit();
  handleRemoveItem();
  handleMarkItemComplete();
  handleMarkItemIncomplete();
}

$(main);

