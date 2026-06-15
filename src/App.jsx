
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Authorized } from './components/auth/Authorized'
import { ApplicationView } from './components/views/ApplicationView'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { GuestSignup } from './components/auth/GuestSignup'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/guest-signup' element={<GuestSignup />} />
      <Route path='*' element={
        <Authorized>
          <ApplicationView />
        </Authorized>
      }></Route>
    </Routes>
  )
}

export default App
