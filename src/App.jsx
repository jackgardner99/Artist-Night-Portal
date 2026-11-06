
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Authorized } from './components/auth/Authorized'
import { ApplicationView } from './components/views/ApplicationView'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { Footer } from './components/nav/Footer'

function App() {
  return (
    <div className="app-shell">
      <div className="app-main">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={
            <Authorized>
              <ApplicationView />
            </Authorized>
          }></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
