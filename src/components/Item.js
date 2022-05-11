import React from 'react';

function Item({ item, BASE_URL, onUpdateItem, onDeleteItem }) {
   function handleAddToCartClick() {
      const options = {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({
            isInCart: !item.isInCart,
         }),
      };

      fetch(`${BASE_URL}/items/${item.id}`, options)
         .then((r) => r.json())
         .then((updatedItem) => onUpdateItem(updatedItem));
   }

   function handleDeleteClick(e) {
      const options = {
         method: 'DELETE',
      };

      fetch(`${BASE_URL}/items/${item.id}`, options)
         .then((r) => r.json())
         .then(() => onDeleteItem(item));
   }

   return (
      <li className={item.isInCart ? 'in-cart' : ''}>
         <span>{item.name}</span>
         <span className="category">{item.category}</span>
         <button
            className={item.isInCart ? 'remove' : 'add'}
            onClick={handleAddToCartClick}
         >
            {item.isInCart ? 'Remove From' : 'Add to'} Cart
         </button>
         <button className="remove" onClick={handleDeleteClick}>
            Delete
         </button>
      </li>
   );
}

export default Item;
