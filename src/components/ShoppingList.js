import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

function ShoppingList() {
   const [selectedCategory, setSelectedCategory] = useState('All');
   const [items, setItems] = useState([]);

   const BASE_URL = 'http://localhost:4000';

   useEffect(() => {
      // fetch data and setItems
      fetch(`${BASE_URL}/items`)
         .then((r) => r.json())
         .then((data) => setItems(data));
   }, []);

   function handleCategoryChange(category) {
      setSelectedCategory(category);
   }

   function handleAddItem(newItem) {
      setItems([...items, newItem]);
   }

   function handleUpdateItem(updatedItem) {
      // console.log(updatedItem);
      const updatedItems = items.map((item) =>
         item.id === updatedItem.id ? updatedItem : item
      );
      setItems(updatedItems);
   }

   function handleDeleteItem(deletedItem) {
      const updatedItems = items.filter((item) => item.id !== deletedItem.id);
      setItems(updatedItems);
   }

   const itemsToDisplay = items.filter((item) => {
      if (selectedCategory === 'All') return true;

      return item.category === selectedCategory;
   });

   return (
      <div className="ShoppingList">
         <ItemForm BASE_URL={BASE_URL} onAddItem={handleAddItem} />
         <Filter
            category={selectedCategory}
            onCategoryChange={handleCategoryChange}
         />
         <ul className="Items">
            {itemsToDisplay.map((item) => (
               <Item
                  key={item.id}
                  item={item}
                  BASE_URL={BASE_URL}
                  onUpdateItem={handleUpdateItem}
                  onDeleteItem={handleDeleteItem}
               />
            ))}
         </ul>
      </div>
   );
}

export default ShoppingList;
