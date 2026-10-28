import { useEffect, useState } from "react"
import { getMyProfile, updateUser, deleteAccount } from "../../services/getUsers"
import { getMyCharts, deleteChart } from "../../services/getCharts"
import { resizeImage } from "../../services/resizeImage"
import { useNavigate } from "react-router-dom"
import { RecordBadge } from "./RecordBadge"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SOCIAL_LINKS } from "./socialLinks"

export const UserProfile = ({ id }) => {
    const [userProfile, setUserProfile] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [myCharts, setMyCharts] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getMyProfile().then(setUserProfile)
        getMyCharts().then(setMyCharts)
    }, [id])

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const resized = await resizeImage(file)
            setImageFile(resized)
            setImagePreview(URL.createObjectURL(resized))
        }
    }

    const handleSaveChanges = () => {
        setIsSaving(true)
        setSaveError("")
        updateUser(userProfile, imageFile)
            .then(() => {
                getMyProfile().then(setUserProfile)
                setIsEditing(false)
                setImageFile(null)
                setImagePreview(null)
            })
            .catch((err) => {
                const fieldErrors = Object.entries(err.fieldErrors || {})
                if (fieldErrors.length) {
                    const labelFor = (field) => SOCIAL_LINKS.find((link) => link.field === field)?.label || field
                    setSaveError(fieldErrors.map(([field, msgs]) => `${labelFor(field)}: ${[].concat(msgs).join(" ")}`).join(" "))
                } else {
                    setSaveError("Your changes didn't save. Check your connection and try again.")
                }
            })
            .finally(() => setIsSaving(false))
    }

    const handleDeleteAccount = () => {
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return
        deleteAccount().then(() => {
            sessionStorage.removeItem("auth_token")
            sessionStorage.removeItem("user")
            navigate("/login", { replace: true })
        })
    }

    const handleDeleteChart = (chartId) => {
        deleteChart(chartId).then(() => {
            setMyCharts(myCharts.filter(c => c.id !== chartId))
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
                            {userProfile.utilities && (
                                <RecordBadge count={userProfile.utilities.signup_count ?? 0} />
                            )}
                            <div className="profile-social-links">
                                {SOCIAL_LINKS.map(({ field, label, icon }) => userProfile.utilities?.[field] && (
                                    <a key={field} href={userProfile.utilities[field]} title={label}>
                                        <FontAwesomeIcon icon={icon} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-full mt-md" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <button className="btn btn-full mt-md" style={{ background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)' }} onClick={handleDeleteAccount}>Delete Account</button>
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
                    {SOCIAL_LINKS.map(({ field, label }) => (
                        <div key={field} className="form-group">
                            <label className="form-label">{label}</label>
                            <input
                                className="form-input"
                                type="url"
                                value={userProfile.utilities?.[field] || ""}
                                onChange={handleUtilitiesChange(field)}
                                placeholder={`${label} Link`} />
                        </div>
                    ))}
                    <div className="form-group">
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={!!userProfile.utilities?.marketing_opt_in}
                                onChange={(e) => setUserProfile({ ...userProfile, utilities: { ...userProfile.utilities, marketing_opt_in: e.target.checked } })} />
                            Email me about upcoming Artist Nights
                        </label>
                    </div>
                    {saveError && <div className="alert alert-error">{saveError}</div>}
                    <button className="btn btn-full" onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            )}

            <div className="form-container mt-lg">
                <h3 className="form-title">My Charts</h3>
                {myCharts.length === 0
                    ? <p className="text-muted text-center">No charts uploaded yet.</p>
                    : (
                        <div className="signup-list">
                            {myCharts.map((chart) => {
                                const isPdf = chart.chart_file?.toLowerCase().endsWith(".pdf")
                                const fileName = chart.chart_file?.split("/").pop()
                                return (
                                    <div key={chart.id} className="signup-item">
                                        <div className="chart-thumbnail">
                                            {isPdf
                                                ? <div className="chart-pdf-badge">PDF</div>
                                                : <img className="chart-preview" src={chart.chart_file} alt={fileName} />
                                            }
                                        </div>
                                        <div className="signup-info">
                                            <div className="signup-name">{fileName}</div>
                                        </div>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteChart(chart.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
