import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistNavbar } from "../nav/ArtistNavbar"
import { Portal } from "../portal/Portal"
import { SignUp } from "../portal/SignUp"
import { ArtistGallery } from "../gallery/ArtistGallery"
import { ArtistProfile } from "../profile/ArtistProfile"
import { UserProfile } from "../profile/UserProfile"

export const ArtistView = ({ user }) => {
    return (
        <Routes>
            <Route path='/' element={<>
            <ArtistNavbar />
            <Outlet />
        </>
        }>
                <Route index element={<Portal user={user} />} />
                <Route path='sign-up' element={<SignUp user={user} />} />
                <Route path='artist-gallery' element={<ArtistGallery user={user} />} />
                <Route path='artist-gallery/:userId' element={<ArtistProfile user={user} />} />
                <Route path='user-profile' element={<UserProfile id={user?.id}/>} />
            </Route>
        </Routes>
    )
}