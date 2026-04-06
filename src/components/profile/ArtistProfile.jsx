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
        <div>
            <div>
                <Link to={'/artist-gallery'}>
                    <div>Back to Gallery</div>
                </Link>
            </div>
            <h2>
                {user.name}
            </h2>
            <div className="form-container">
                <div>
                    Email
                    <div className="form-input">{user.email}</div>
                </div>
                <div>
                    {user.spotifyLink ? (
                        <a href={user.spotifyLink}
                        className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                        <FontAwesomeIcon icon={faSpotify} className="h-6 w-6" />
                    </a>
                    ) : ""}
                </div>
                <div>
                    {user.appleMusicLink ? (
                        <a href={user.appleMusicLink}
                        className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                        <FontAwesomeIcon icon={faApple} className="h-6 w-6" />
                    </a>
                    ) : ""}
                </div>
                <div>
                    {user.youtubeLink ? (
                        <a href={user.youtubeLink}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                            <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
                        </a>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}