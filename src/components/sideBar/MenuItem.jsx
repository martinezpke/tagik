// SideBar/MenuItem.js
import SubMenu from "./SubMenu";

const MenuItem = ({ iconClass, label, submenu }) => {
  return (
    <li>
      <div className="btn-a">
        <i className={`bx ${iconClass}`}></i>
        <a href="#">{label}</a>
      </div>
      {submenu && <ul className="submenu">{submenu}</ul>}
    </li>
  );
};

export default MenuItem;
