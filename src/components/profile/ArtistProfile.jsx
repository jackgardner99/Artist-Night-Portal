import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserById } from "../../services/getUsers"
import { RecordBadge } from "./RecordBadge"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SOCIAL_LINKS } from "./socialLinks"

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
                    {user.utilities && (
                        <RecordBadge count={user.utilities.signup_count ?? 0} />
                    )}
                    <div className="profile-social-links">
                        {SOCIAL_LINKS.map(({ field, label, icon }) => user.utilities?.[field] && (
                            <a key={field} href={user.utilities[field]} title={label}>
                                <FontAwesomeIcon icon={icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
