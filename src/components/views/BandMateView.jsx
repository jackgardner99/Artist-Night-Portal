import { Outlet, Route, Routes } from "react-router-dom"
import { Portal } from "../portal/Portal"
import { SignUpSheet } from "../portal/SignUpSheet"
import { ChartView } from "../portal/ChartView"
import { BandNavbar } from "../nav/BandNavbar"
import { ArtistGallery } from "../gallery/ArtistGallery"
import { ArtistProfile } from "../profile/ArtistProfile"
import { UserProfile } from "../profile/UserProfile"

export const BandMateView = ({ user }) => {
    return (
        <Routes>
            <Route path='/' element={<>
            <BandNavbar />
            <Outlet />
        </>
        }>
                <Route index element={<SignUpSheet />} />
                <Route path='chart-view' element={<ChartView />} />
                <Route path='artist-gallery' element={<ArtistGallery user={user} />} />
                <Route path='artist-gallery/:userId' element={<ArtistProfile user={user}/>} />
                <Route path='user-profile' element={<UserProfile id={user?.id}/>} />
            </Route>
        </Routes>
    )
}