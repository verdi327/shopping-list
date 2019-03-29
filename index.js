'use strict';

// building list item html
function buildNewListItem(item) {
  return `<li>
    <span class="shopping-item">${item}</span>
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

$( function() {
  // add item
  $('form').on('submit', function(event) {
    event.preventDefault();
    const input = $(this).find('input');
    const item = input.val();
    const template = buildNewListItem(item); 
    $('.shopping-list').prepend(template);
    input.val('');
  });

  $('.container').keypress(function (e) {
    if (e.which === 13) {
      $('form').submit();
      return false;
    }
  });

  // remove an item
  $('.container').on('click', '.shopping-item-delete', function(event) {
    const listItem = $(this).closest('li');
    listItem.remove();
  });

  // marking item as completed
  $('.container').on('click', '.shopping-item-toggle', function(event) {
    const listItem = $(this).parent().siblings().first();
    listItem.toggleClass('shopping-item__checked');
  });

});

