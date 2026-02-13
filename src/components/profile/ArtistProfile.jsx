import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserById } from "../../services/getUsers"

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
            <div>
                {user.email}
            </div>
            <div>
                {user.spotifyLink}
            </div>
            <div>
                {user.appleMusicLink}
            </div>
            <div>
                {user.youtubeLink}
            </div>
        </div>
    )
}