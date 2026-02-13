import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistNavbar } from "../nav/ArtistNavbar"
import { Portal } from "../portal/Portal"
import { SignUp } from "../portal/SignUp"
import { ArtistGallery } from "../gallery/ArtistGallery"
import { ArtistProfile } from "../profile/ArtistProfile"

export const ApplicationView = () => {
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