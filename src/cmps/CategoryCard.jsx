import { Link } from 'react-router-dom';

export function CategoryCard({ category }) {
   const style = {
      backgroundColor: category.backgroundColor,
   };
   return (
      <div>
         <Link to={`/genre/${category.name}`}>
            <div className="category-card" style={style}>
               <span>{category.name}</span>
               <img src={category.imgUrl} />
            </div>
         </Link>
      </div>
   );
}
