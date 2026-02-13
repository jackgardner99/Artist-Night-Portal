
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Portal } from './components/portal/Portal'
import { ArtistNavbar } from './components/nav/ArtistNavbar'
import { SignUp } from './components/portal/SignUp'
import { ArtistGallery } from './components/gallery/ArtistGallery'
import { ArtistProfile } from './components/profile/ArtistProfile'

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
        <Route path='artist-gallery' element={<ArtistGallery />} />
        <Route path='artist-gallery/:userId' element={<ArtistProfile />} />
      </Route>
    </Routes>
  )
}

export default App
