import { Link, useNavigate } from "react-router-dom"

export const ArtistNavbar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <div className="container flex-between">
                <Link to={'/'}>
                    <img src={`${import.meta.env.BASE_URL}photos/BH-Artist-Night-Title_light_with-tag.PNG`} alt="Artist Night Logo" />
                </Link>
                <ul className="navbar-links">
                    <li><Link to={'/'}>Artist Night</Link></li>
                    <li><Link to={'/artist-gallery'}>Artist Gallery</Link></li>
                    <li><Link to={'/user-profile'}>Profile</Link></li>
                    <li>
                        <Link to={"/login"} onClick={() => {
                            sessionStorage.removeItem("auth_token")
                            sessionStorage.removeItem("user")
                            navigate("/login", { replace: true })
                        }}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
