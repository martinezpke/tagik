// SideBar/SubMenu.js

const SubMenu = ({ items }) => {
  return (
    <ul className="submenu">
      {items.map((item, index) => (
        <li key={index}>
          <a href="#">{item}</a>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
