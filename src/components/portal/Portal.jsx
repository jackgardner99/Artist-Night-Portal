import { Link } from "react-router-dom"

export const Portal = ({ user }) => {
    return (
        <div className="hero">
            <div className="container">
                <h1 className="hero-title">Artist Night Portal</h1>
                <p className="hero-subtitle">Welcome{user?.username ? `, ${user.username}` : ""}! Sign up to perform or explore the artist gallery.</p>
                <Link to={'/sign-up'}>
                    <button className="btn btn-lg">Sign Up to Perform</button>
                </Link>
                <div className="mt-lg">
                    <span className="text-secondary">Need to book the studio? </span>
                    <a href="https://www.bluehousebandofficial.com/studio" className="text-accent">Blue House Studio</a>
                </div>
            </div>
        </div>
    )
}
