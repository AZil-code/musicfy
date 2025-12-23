import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../store/actions/search.actions.js';
import { CategoryCard } from '../cmps/CategoryCard';
import { SearchBar } from '../cmps/SearchBar.jsx';

export function BrowsePage() {
   const [categories, setCategories] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      loadCategories();
   }, []);

   useEffect(() => {
      console.log('categories: ', categories)
   }, [categories]);

   async function loadCategories() {
      const categories = await fetchCategories();
      setCategories(() => categories);
   }
   return (
      <section className="browse-all-container">
         <div className="mobile-search-inline">
            <SearchBar placeholderTxt="What do you want to play?" onSearch={(str) => navigate(str ? `/search/${str}` : '/search')} />
         </div>
         <h2>Browse All</h2>
         <div className="category-list">
            {categories.length > 0 && categories.map((category) => <CategoryCard category={category} />)}
         </div>
      </section>
   );
}
