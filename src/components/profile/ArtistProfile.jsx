import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserById } from "../../services/getUsers"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faApple, faYoutube } from '@fortawesome/free-brands-svg-icons'

export const ArtistProfile = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId).then(setUser)
    }, [userId])

    return (
        <div className="container">
            <Link to={'/artist-gallery'} className="btn btn-outline btn-sm mt-md">
                ← Back to Gallery
            </Link>
            <div className="profile-header">
                {user.utilities?.user_image
                    ? <img className="profile-avatar" src={user.utilities.user_image} alt={user.username} />
                    : <div className="profile-avatar-placeholder">{user.username?.[0]?.toUpperCase()}</div>
                }
                <div>
                    <h2>
                        {user.first_name && user.last_name
                            ? `${user.first_name} ${user.last_name}`
                            : user.username}
                    </h2>
                    <div className="profile-social-links">
                        {user.utilities?.spotify_link && (
                            <a href={user.utilities.spotify_link} title="Spotify">
                                <FontAwesomeIcon icon={faSpotify} />
                            </a>
                        )}
                        {user.utilities?.apple_link && (
                            <a href={user.utilities.apple_link} title="Apple Music">
                                <FontAwesomeIcon icon={faApple} />
                            </a>
                        )}
                        {user.utilities?.youtube_link && (
                            <a href={user.utilities.youtube_link} title="YouTube">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
