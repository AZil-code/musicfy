import { useEffect, useState } from 'react';
import { fetchCategories } from '../store/actions/search.actions';
import { CategoryCard } from '../cmps/CategoryCard';

export function BrowsePage() {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      loadCategories();
   }, []);

   async function loadCategories() {
      const categories = await fetchCategories();
      setCategories(() => categories);
   }
   return (
      <section className="browse-all-container">
         <h2>Browse All</h2>
         <div className="category-list">
            {categories.length > 0 && categories.map((category) => <CategoryCard category={category} />)}
         </div>
      </section>
   );
}
