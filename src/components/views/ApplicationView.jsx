import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistNavbar } from "../nav/ArtistNavbar"
import { Portal } from "../portal/Portal"
import { SignUp } from "../portal/SignUp"
import { ArtistGallery } from "../gallery/ArtistGallery"
import { ArtistProfile } from "../profile/ArtistProfile"
import { useEffect, useState } from "react"
import { ArtistView } from "./ArtistView"
import { BandMateView } from "./BandMateView"

export const ApplicationView = () => {
    const [artist, setArtist] = useState({})
    const [bandmember, setBandmember] = useState({})

    useEffect(() => {
        const artist = localStorage.getItem("artist")
        const artistObject = JSON.parse(artist)
        setArtist(artistObject)

        const bandMate = localStorage.getItem("bandmember")
        const bandObject = JSON.parse(bandMate)
        setBandmember(bandObject)
    }, [])

    return artist ? <ArtistView artist={artist} /> : <BandMateView bandmember={bandmember} />
}