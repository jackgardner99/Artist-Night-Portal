import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const BandNavbar = () => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return (
        <nav className="navbar">
            <div className="container flex-between">
                <Link to={'/'} onClick={closeMenu}>
                    <img src={`${import.meta.env.BASE_URL}photos/BH-Artist-Night-Title_light_with-tag.PNG`} alt="Artist Night Logo" />
                </Link>
                <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
                    <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
                    <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
                </button>
                <ul className={`navbar-links${menuOpen ? " navbar-links-open" : ""}`}>
                    <li><Link to={'/'} onClick={closeMenu}>Signup Sheet</Link></li>
                    <li><Link to={'/artist-gallery'} onClick={closeMenu}>Artist Gallery</Link></li>
                    <li><Link to={'/user-profile'} onClick={closeMenu}>Profile</Link></li>
                    <li>
                        <Link to={"/login"} onClick={() => {
                            sessionStorage.removeItem("auth_token")
                            sessionStorage.removeItem("user")
                            closeMenu()
                            navigate("/login", { replace: true })
                        }}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
