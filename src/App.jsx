import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { Toaster } from 'react-hot-toast';
import CreateProfile from './pages/CreateProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/HomePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-profile' element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App;