import { Link, useNavigate } from "react-router-dom"

export const ArtistNavbar = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Link to={'/'}>
                    <img src="/photos/BH-Artist-Night-Title_light_with-tag.PNG" alt="Artist Night Logo" />
                </Link>
            </div>
            <div>
                <Link to={'/'}>Artist Night</Link>
            </div>
            <div>
                <Link to={'/artist-gallery'}>Artist Gallery</Link>
            </div>
            <div>
                <Link to={'/user-profile'}>Profile</Link>
            </div>
            <div>
                {localStorage.getItem("artist") ? 
            (<li>
                <Link to={"/login"} onClick={() => {
                localStorage.removeItem("artist")
                navigate("/login", { replace: true })
            }}
                    >Logout
                </Link>
            </li>) : 
            ("")
        }
            </div>
        </nav>
    )
}