import { Route, Routes } from "react-router-dom"
import { Portal } from "../portal/Portal"
import { SignUpSheet } from "../portal/SignUpSheet"
import { BandNavbar } from "../nav/BandNavbar"

export const BandMateView = ({ bandmember }) => {
    return (
        <Routes>
            <Route path='/' element={<>
            <BandNavbar />
            <Outlet />
        </>        
        }>
                <Route index element={<Portal bandmember={bandmember}/>} />
                <Route path='sign-up' element={<SignUpSheet bandmember={bandmember} />} />
                <Route path='artist-gallery' element={<ArtistGallery bandmember={bandmember} />} />
                <Route path='artist-gallery/:userId' element={<ArtistProfile bandmember={bandmember}/>} />
            </Route>
        </Routes>
    )
}