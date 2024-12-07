import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute } from './components/ProtectedRoute'
// import DashBoard from './pages/DashBoard'
import { AuthProvider } from './context/AuthContext'
import NewFlow from './pages/NewFlow'
import Home from './pages/Home'
import { Toaster } from '@/components/ui/toaster';


function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Toaster />
      <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<Signup />} />
        <Route element={<ProtectedRoute />}>
        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        <Route path="/flow/new" element={<NewFlow />} />
        <Route path='/' element = {<Home />} />
        </Route>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
      </>
  )
}

export default App
