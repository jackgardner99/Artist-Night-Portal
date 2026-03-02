import { Link, useNavigate } from "react-router-dom"

export const BandNavbar = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <div>
                <Link to={'/'}>Signup Sheet</Link>
            </div>
            <div>
                <Link to={'/artist-gallery'}>Artist Gallery</Link>
            </div>
            <div>
                <Link>Profile</Link>
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
        </nav>
    )
}