import MenuItem from "../components/SideBar/MenuItem";
import SubMenu from "../components/SideBar/SubMenu";
import "/public/css/sidebar.css";
import "/public/css/table.css";

const Card = () => {
  return (
    <div>
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
                <div className="header__table">
                  <div className="title__table">
                    <h4>VCard</h4>
                  </div>
                  <div className="more__card">
                    <button type="button">
                      <i className="bx bx-plus"></i> <span>VCard</span>
                    </button>
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>
                </div>

                <table className="container__table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Nombre VCard</th>
                      <th>Previsualización</th>
                      <th>Dirección</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Puedes llenar esta sección con datos dinámicamente */}
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Nombre de ejemplo</td>
                      <td>Previsualización de ejemplo</td>
                      <td>Dirección de ejemplo</td>
                      <td>
                        {/* Agrega aquí tus botones de acciones */}
                        <button id="edit"><i className='bx bxs-edit'></i></button>
                        <button id="del"><i className='bx bxs-trash'></i></button>
                      </td>
                    </tr>
                    {/* Puedes agregar más filas según tus datos */}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
