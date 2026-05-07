import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/getUsers"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faApple, faYoutube } from '@fortawesome/free-brands-svg-icons'

export const UserProfile = ({ id }) => {
    const [userProfile, setUserProfile] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        getUserById(id).then(setUserProfile)
    }, [id])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSaveChanges = () => {
        updateUser(userProfile, imageFile).then(() => {
            getUserById(id).then(setUserProfile)
            setIsEditing(false)
            setImageFile(null)
            setImagePreview(null)
        })
    }

    const handleUtilitiesChange = (field) => (e) => {
        setUserProfile({ ...userProfile, utilities: { ...userProfile.utilities, [field]: e.target.value } })
    }

    return (
        <div className="container">
            {!isEditing ? (
                <div className="form-container">
                    <div className="profile-header">
                        {userProfile.utilities?.user_image
                            ? <img className="profile-avatar" src={userProfile.utilities.user_image} alt={userProfile.username} />
                            : <div className="profile-avatar-placeholder">{userProfile.username?.[0]?.toUpperCase()}</div>
                        }
                        <div>
                            <h2 className="form-title">
                                {userProfile.first_name && userProfile.last_name
                                    ? `${userProfile.first_name} ${userProfile.last_name}`
                                    : userProfile.username}
                            </h2>
                            <div className="profile-social-links">
                                {userProfile.utilities?.spotify_link && (
                                    <a href={userProfile.utilities.spotify_link} title="Spotify">
                                        <FontAwesomeIcon icon={faSpotify} />
                                    </a>
                                )}
                                {userProfile.utilities?.apple_link && (
                                    <a href={userProfile.utilities.apple_link} title="Apple Music">
                                        <FontAwesomeIcon icon={faApple} />
                                    </a>
                                )}
                                {userProfile.utilities?.youtube_link && (
                                    <a href={userProfile.utilities.youtube_link} title="YouTube">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-full mt-md" onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <div className="form-container">
                    <h2 className="form-title">Edit Profile</h2>
                    <div className="form-group">
                        <label className="form-label">Profile Image</label>
                        <div className="chart-upload-area" onClick={() => document.getElementById("profile-image-input").click()}>
                            <input
                                id="profile-image-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview || userProfile.utilities?.user_image
                                ? <img className="profile-avatar" src={imagePreview || userProfile.utilities.user_image} alt="Preview" />
                                : <p className="text-muted">Click to upload a profile image</p>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={userProfile.first_name || ""}
                            onChange={(e) => setUserProfile({ ...userProfile, first_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={userProfile.last_name || ""}
                            onChange={(e) => setUserProfile({ ...userProfile, last_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Spotify</label>
                        <input
                            className="form-input"
                            type="url"
                            value={userProfile.utilities?.spotify_link || ""}
                            onChange={handleUtilitiesChange("spotify_link")}
                            placeholder="Spotify Link" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Apple Music</label>
                        <input
                            className="form-input"
                            type="url"
                            value={userProfile.utilities?.apple_link || ""}
                            onChange={handleUtilitiesChange("apple_link")}
                            placeholder="Apple Music Link" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">YouTube</label>
                        <input
                            className="form-input"
                            type="url"
                            value={userProfile.utilities?.youtube_link || ""}
                            onChange={handleUtilitiesChange("youtube_link")}
                            placeholder="YouTube Link" />
                    </div>
                    <button className="btn btn-full" onClick={handleSaveChanges}>Save Changes</button>
                </div>
            )}
        </div>
    )
}
