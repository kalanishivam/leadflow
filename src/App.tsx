import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute } from './components/ProtectedRoute'
import DashBoard from './pages/DashBoard'
import { AuthProvider } from './context/AuthContext'


function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<Signup />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route element={<ProtectedRoute />}>
        </Route>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
      </>
  )
}

export default App
