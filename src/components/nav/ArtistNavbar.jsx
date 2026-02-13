import { Link, useNavigate } from "react-router-dom"

export const ArtistNavbar = () => {
    const navigate = useNavigate()

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