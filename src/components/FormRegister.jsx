import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FormRegister.css";
import Cookies from "js-cookie";
import axios from "axios";

function FormRegister() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    last_name: "",
    country: "",
    email: "",
    password: "",
    password2: ""
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccess = (response) => {
    const token = response.data.token;
    if (token) {
      Cookies.set("token", token);
      navigate("/test");
      console.log("Registro exitoso:", response.data);
    }
  };

  const handleApiError = (error) => {
    if (axios.isCancel(error)) {
      console.log("La solicitud fue cancelada");
    } else if (error.response) {
      setMsg(error.response.data.msg);
      console.error("Respuesta de error de la API:", error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta de la API");
    } else {
      console.error("Error durante la solicitud:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      const response = await axios.post(
        "http://localhost:8080/sign-up",
        formData,
        { cancelToken: signal.token }
      );
      handleSuccess(response);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
      abortController.abort();
    }
  };

  const cookieToke = () => {
    const getToken = Cookies.get("token");
    if (getToken) {
      navigate("/test");
    }
  };

  useEffect(() => {
    cookieToke();
  }, [navigate]);

  return (
    <div className="wrapper">
      <div className="grip__container">
        <div className="form-login column">
          <h1>Registro</h1>
          {msg && <p className="msg-error">{msg}</p>}
          <form onSubmit={handleSubmit}>
            <div className="row-input">
              <div className="row">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="row">
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Apellido"
                />
              </div>
            </div>

            <div className="row">
              <i className='bx bxs-user-circle'></i>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuario"
              />
            </div>

            <div className="row-input">
              <div className="row">
                <i className="bx bxs-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>

              <div className="row">
                {/* <i className="bx bxs-globe"></i> */}
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="País"
                />
              </div>
            </div>

            <div className="row-input">
              <div className="row">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
              </div>

              <div className="row">
                {/* <i className="bx bxs-lock-alt"></i> */}
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="btn-sut">
              <button type="submit" style={{ marginTop: "10px" }}>
                {isLoading ? "Cargando..." : "Registrar"}
              </button>
            </div>
          </form>
        </div>
        <div className="background-img"></div>
      </div>
    </div>
  );
}

export default FormRegister;
