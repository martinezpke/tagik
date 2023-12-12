import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedView from './pages/ProtectedView';
/* import './App.css' */

function App() {

  return (
    <Router>
         <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/test" element={<ProtectedView />} />
         </Routes>
      </Router>
  )
}

export default App
