import { Link } from "react-router-dom"

export const ArtistNavbar = () => {
    return (
        <nav>
            <div>
                <Link to={'/'}>Artist Night</Link>
            </div>
            <div>
                <Link to={'/artist-gallery'}>Artist Gallery</Link>
            </div>
            <div>
                <Link>Profile</Link>
            </div>
            <div>
                <Link>Logout</Link>
            </div>
        </nav>
    )
}