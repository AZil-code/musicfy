export function ContextMenu({ menuData, onClose }) {
   if (!menuData.items || menuData.items.length === 0) return null;

   return (
      <ul
         style={{
            top: `${menuData.y}px`,
            left: `${menuData.x}px`,
         }}
         className="context-menu clean-list"
      >
         {Array.from(menuData.items.entries()).map(([action, callback], index) => (
            <li
               key={index}
               style={{ padding: '8px 15px', cursor: 'pointer' }}
               onMouseDown={(e) => e.stopPropagation()} // Prevent closing on item click
               onClick={() => {
                  callback();
                  onClose();
               }}
            >
               {action}
            </li>
         ))}
      </ul>
   );
}
