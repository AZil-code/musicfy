export function CategoryCard({ category }) {
   const style = {
      backgroundColor: category.backgroundColor,
   };
   return (
      <div>
         <a>
            <div className="category-card" style={style}>
               <span>{category.name}</span>
               <img src={category.imgUrl} />
            </div>
         </a>
      </div>
   );
}
