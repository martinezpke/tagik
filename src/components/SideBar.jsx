import "/public/css/sidebar.css";
import MenuItem from "./SideBar/MenuItem";
import SubMenu from "./SideBar/SubMenu";

const SideBar = () => {
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <div className="header__bar">
            <img src="/public/img/Logo Tagik-07.png" alt="Tagik" />
          </div>

          <ul className="menu__option">
            <MenuItem
              iconClass="bxs-briefcase"
              label="Portafolio"
              submenu={<SubMenu items={["Temas"]} />}
            />
            <MenuItem iconClass="bxs-business" label="Empresa" />
            <MenuItem
              iconClass="bxs-id-card"
              label="Gestión de Vcar"
              submenu={<SubMenu items={["Vcard"]} />}
            />
          </ul>
        </div>

        <div className="content">
          <div className="topbar">
            <i className="bx bx-bell" id="notif"></i>
            <div className="user-info">
              <img
                src="/public/img/photo_2023-10-03_16-11-48.jpg"
                alt="Foto de perfil"
              />
              <span>Nombre del Usuario</span>
              <i className="bx bx-chevron-down"></i>
            </div>
          </div>

          <section className="section__list">
            <h1>Listado VCard</h1>
            <div className="container">
              <div className="title__table"></div>
              <div className="more__card"></div>
              <div className="cotainer__table"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
