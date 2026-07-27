import { useEffect, useState } from "react"
import { getUsers } from "../../services/getUsers"
import { Link } from "react-router-dom"

export const ArtistGallery = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    const sortedUsers = [...users].sort((a, b) => (a.first_name || "").localeCompare(b.first_name || ""))

    const groupedUsers = sortedUsers.reduce((groups, user) => {
        const letter = (user.first_name || "#")[0].toUpperCase()
        if (!groups[letter]) groups[letter] = []
        groups[letter].push(user)
        return groups
    }, {})

    return (
        <div className="container">
            <h2>Artist Gallery</h2>
            {Object.entries(groupedUsers).map(([letter, group]) => (
                <div key={letter} className="gallery-section">
                    <h3 className="gallery-section-heading">{letter}</h3>
                    <div className="gallery">
                        {group.map((user) => {
                            return (
                                <Link key={user.id} to={`/artist-gallery/${user.id}`}>
                                    <div className="gallery-card">
                                        {user.utilities?.user_image
                                            ? <img src={user.utilities.user_image} alt={user.username} />
                                            : <div className="gallery-card-placeholder" />
                                        }
                                        <div className="signup-name">{user.first_name} {user.last_name}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
