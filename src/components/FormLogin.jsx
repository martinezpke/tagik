import { useState } from "react";
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
      console.error("Respuesta de error de la API:", error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta de la API");
    } else {
      console.error("Error durante la solicitud:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      abortController.abort();
    }
  };

  return (
    <>
      <div className="grip__container">
        <div className="form-login column">
          <div className="row">
            <i className='bx bxs-envelope'></i>
            <label htmlFor="email">Email</label> 
            <input type="email" name="email" id="email" />
          </div>
          <div className="row">
            <i className='bx bxs-lock-alt'></i>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
        </div>
        <div className="background-img">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita maxime consequatur explicabo iusto aspernatur blanditiis vel odit eaque autem. Esse quo cum nobis rerum ipsa quidem officia error tempora modi.</p>
        </div>
      </div>
    </>
  );
};

export default FormLogin;

{
  /* <div classNameName="login-container">
      <h1>Login</h1>
      <form classNameName="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" classNameName="submit-button" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div> */
}
