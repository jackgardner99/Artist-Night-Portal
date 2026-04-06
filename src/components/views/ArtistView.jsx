import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistNavbar } from "../nav/ArtistNavbar"
import { Portal } from "../portal/Portal"
import { SignUp } from "../portal/SignUp"
import { ArtistGallery } from "../gallery/ArtistGallery"
import { ArtistProfile } from "../profile/ArtistProfile"
import { UserProfile } from "../profile/UserProfile"

export const ArtistView = ({ artist }) => {
    return (
        <Routes>
            <Route path='/' element={<>
            <ArtistNavbar />
            <Outlet />
        </>        
        }>
                <Route index element={<Portal artist={artist} />} />
                <Route path='sign-up' element={<SignUp artist={artist} />} />
                <Route path='artist-gallery' element={<ArtistGallery artist={artist} />} />
                <Route path='artist-gallery/:userId' element={<ArtistProfile artist={artist} />} />
                <Route path='user-profile' element={<UserProfile id={artist.id}/>} />
            </Route>
        </Routes>
    )
}