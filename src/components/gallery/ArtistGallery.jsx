import { useEffect, useState } from "react"
import { getUsers } from "../../services/getUsers"
import { Link } from "react-router-dom"

export const ArtistGallery = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    return (
        <div className="container">
            <h2>Artist Gallery</h2>
            <div className="gallery">
                {users.map((user) => {
                    return (
                        <Link key={user.id} to={`/artist-gallery/${user.id}`}>
                            <div className="gallery-card">
                                {user.utilities?.user_image
                                    ? <img src={user.utilities.user_image} alt={user.username} />
                                    : <div className="gallery-card-placeholder" />
                                }
                                <div className="signup-name">{user.username}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
