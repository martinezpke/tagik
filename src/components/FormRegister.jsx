import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormRegister.css'
import Cookies from 'js-cookie';
import axios from 'axios';

function FormRegister() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    last_name: '',
    country: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/sign-up', formData);
      const token = await response.data.token;
      Cookies.set('token', token);
      
      setSuccess(true);
      setError()
      navigate('/test');
      // Puedes manejar la respuesta de la API según tus necesidades
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className='register-container'>
      <h1>Registro</h1>
      {success && <p>Registro exitoso</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className='register-form'>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default FormRegister;
