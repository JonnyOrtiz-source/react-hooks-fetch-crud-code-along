import React, { useState } from 'react';

function ItemForm({ BASE_URL, onAddItem }) {
   const [name, setName] = useState('');
   const [category, setCategory] = useState('Produce');

   function handleSubmit(e) {
      e.preventDefault();
      const itemData = {
         name:
            e.target.name.value.charAt().toUpperCase() +
            e.target.name.value.slice(1),
         category,
         isInCart: false,
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify(itemData),
      };

      fetch(`${BASE_URL}/items`, options)
         .then((r) => r.json())
         .then((newItem) => onAddItem(newItem));
   }
   return (
      <form className="NewItem" onSubmit={handleSubmit}>
         <label>
            Name:
            <input
               type="text"
               name="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </label>

         <label>
            Category:
            <select
               name="category"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
            >
               <option value="Produce">Produce</option>
               <option value="Dairy">Dairy</option>
               <option value="Dessert">Dessert</option>
            </select>
         </label>

         <button type="submit">Add to List</button>
      </form>
   );
}

export default ItemForm;
