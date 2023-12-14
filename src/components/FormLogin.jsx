import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "/public/css/FormLogin.css";
import Cookies from "js-cookie";
import axios from "axios";

const FormLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      console.log("Inicio de sesión exitoso:", response.data);
      navigate("/test");
    }
  };

  const handleApiError = (error) => {
    if (axios.isCancel(error)) {
      console.log("La solicitud fue cancelada");
    } else if (error.response) {
      setMsg(error.response.data.msg)
      /* console.error("Respuesta de error de la API:", error.response.data); */
    } else if (error.request) {
      console.error("No se recibió respuesta de la API");
    } else {
      console.error("Error durante la solicitud:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      const response = await axios.post(
        "http://localhost:8080/sign-in",
        formData,
        { cancelToken: signal.token }
      );
      handleSuccess(response);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false)
      abortController.abort();
    }
  };

  const cookieToke = () => {
    const getToken = Cookies.get('token')
    if (getToken) {
      navigate('/test');
    } 
  }

  useEffect(() => {
    cookieToke()
  }, [navigate])  
  
  return (
    <div className="wrapper">
      <div className="grip__container">
        <div className="form-login column">
          <h1>Login</h1>
          {msg && <p className="msg-error">{msg}</p>}
          <div className="row">
            <i className='bx bxs-envelope icon'></i>
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} placeholder="Usuario"/>
          </div>
          <div className="row">
            <i className='bx bxs-lock-alt'></i>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Contraseña"/>
          </div>
          <p>¿Has olvidado tu contraseña?</p>
          <button type="button" onClick={handleSubmit}>{isLoading ? "Cargando..." : "Iniciar sesión"}</button>
        </div>
        <div className="background-img"></div>
      </div>
    </div>
  );
};

export default FormLogin;
