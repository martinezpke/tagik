import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const ProtectedView = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token')

        if (!token) {
          // Si no hay token, redirigir al usuario a la página de inicio de sesión
          navigate('/sign-in');
        } else {
          // Si hay un token, realizar una solicitud al servidor para verificar su validez
          // y obtener información sobre el usuario
          const response = await axios.get('http://localhost:8080/user', {
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });

          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error:', error);
        // Si hay un error (por ejemplo, token no válido), redirigir al usuario a la página de inicio de sesión
        navigate('/sign-in');
      }
    };

    fetchData();
  }, [navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.username}!</h1>
      {/* Contenido protegido */}
    </div>
  );
};

export default ProtectedView;
