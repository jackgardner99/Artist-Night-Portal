import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/getUsers"

 export const UserProfile = ({ id }) => {
    const [userProfile, setUserProfile] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        getUserById(id).then(setUserProfile)
    }, [id])

    const handleSaveChanges = () => {
        if (userProfile.name && userProfile.email) {
            updateUser(userProfile).then(getUserById(id).then(setUserProfile))
            setIsEditing(false)
        } else {
            window.alert("Make sure that name and email fields are filled out")
        }
    }

    return (
        <div>
            <h2 className="form-title">
                {userProfile.name}
            </h2>
            {!isEditing ? (
                <div className="form-container">
                    <div>
                        Email
                        <div className="form-input">{userProfile.email}</div>
                    </div>
                    <div>
                        Spotify
                        <div className="form-input">{userProfile.spotifyLink}</div>
                    </div>
                    <div>
                        Apple Music
                        <div className="form-input">{userProfile.appleMusicLink}</div>
                    </div>
                    <div>
                        YouTube
                        <div className="form-input">{userProfile.youtubeLink}</div>
                    </div>
                    <div>
                        <button className="btn" onClick={() => {
                            setIsEditing(true)
                        }}>Edit Profile</button>  
                    </div>
                </div>
            ) : (
                <div className="form-container">
                    <div>
                        Artist Name
                        <input
                        className="form-input"
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.name = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        Email
                        <input
                        className="form-input"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.email = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        Spotify
                        <input
                        className="form-input"
                        type="url"
                        value={userProfile.spotifyLink}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.spotifyLink = e.target.value
                            setUserProfile(copy)
                        }}
                        placeholder="Spotify Link"/>
                    </div>
                    <div>
                        Apple Music
                        <input
                        className="form-input"
                        type="url"
                        value={userProfile.appleMusicLink}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.appleMusicLink = e.target.value
                            setUserProfile(copy)
                        }}
                        placeholder="Apple Music Link"/>
                    </div>
                    <div>
                        YouTube
                        <input
                        className="form-input"
                        type="url"
                        value={userProfile.youtubeLink}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.youtubeLink = e.target.value
                            setUserProfile(copy)
                        }}
                        placeholder="YouTube Link"/>
                    </div>
                    <div>
                        <button className="btn" onClick={handleSaveChanges}>Save Changes</button>  
                    </div>
                </div>
            )}
        </div>
    )
}  