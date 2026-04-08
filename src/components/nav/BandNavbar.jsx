import { Link, useNavigate } from "react-router-dom"

export const BandNavbar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Link to={'/'}>
                    <img src="/photos/BH-Artist-Night-Title_light_with-tag.PNG" alt="Artist Night Logo" />
                </Link>
            </div>
            <div className="navbar-links">
                <div>
                    <Link to={'/'}>Signup Sheet</Link>
                </div>
                <div>
                    <Link to={'/artist-gallery'}>Artist Gallery</Link>
                </div>
                <div>
                    <Link to={'/user-profile'}>Profile</Link>
                </div>
                <div>
                    {localStorage.getItem("bandmember") ? 
                (<li>
                    <Link to={"/login"} onClick={() => {
                    localStorage.removeItem("bandmember")
                    navigate("/login", { replace: true })
                }}
                        >Logout
                    </Link>
                </li>) : 
                ("")
            }
                </div>
            </div>
        </nav>
    )
}