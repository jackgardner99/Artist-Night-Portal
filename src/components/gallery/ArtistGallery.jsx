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
            <h2 >Artist Gallery</h2>
            <div>
                {users.map((user) => {
                    return (
                        <div className="signup-list">
                            <Link to={`/artist-gallery/${user.id}`}>
                                <div className="signup-name">{user.name}</div>
                            </Link>                           
                        </div>
                    )
                })}
            </div>
        </div>
    )
}