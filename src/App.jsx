
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Portal } from './components/portal/Portal'
import { ArtistNavbar } from './components/nav/ArtistNavbar'
import { SignUp } from './components/portal/SignUp'

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<>
        <ArtistNavbar />
        <Outlet />
      </>        
      }>
        <Route index element={<Portal />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
