'use strict';

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
  $('.container').on('click', '.shopping-item-delete', function() {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    shoppingList.removeItem(listItem);
    shoppingList.renderList();
  });
}

function handleToggleComplete() {
  $('.container').on('click', '.shopping-item-toggle', function() {
    const listItem = $(this).closest('li').find('.shopping-item').text();
    shoppingList.toggleComplete(listItem);
    shoppingList.renderList();
  });
}

function handleShowCompletedItems() {
  $('.container').on('change', '#show-completed-items', function() {
    shoppingList.toggleShowCompleted();
    shoppingList.renderList();
  });
}

function handleEditItem() {
  $('.container').on('click', '.shopping-item-edit', function() {
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
  $('.container').on('click', 'button[name="clear-list"]', function() {
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

