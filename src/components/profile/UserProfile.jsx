import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/getUsers"
import { Link } from "react-router-dom"

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
            <h2>
                {userProfile.name}
            </h2>
            {!isEditing ? (
                <div>
                    <div>
                        {userProfile.email}
                    </div>
                    <div>
                        {userProfile.spotifyLink}
                    </div>
                    <div>
                        {userProfile.appleMusicLink}
                    </div>
                    <div>
                        {userProfile.youtubeLink}
                    </div>
                    <div>
                        <button onClick={() => {
                            setIsEditing(true)
                        }}>Edit Profile</button>  
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.name = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.email = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        <input
                        type="url"
                        value={userProfile.spotifyLink}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.spotifyLink = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        <input
                        type="url"
                        value={userProfile.appleMusicLink}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.appleMusicLink = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        <input
                        type="url"
                        value={userProfile.youtubeLink}
                        onChange={(e) => {
                            const copy = {...userProfile}
                            copy.youtubeLink = e.target.value
                            setUserProfile(copy)
                        }}/>
                    </div>
                    <div>
                        <button onClick={handleSaveChanges}>Save Changes</button>  
                    </div>
                </div>
            )}
        </div>
    )
}  