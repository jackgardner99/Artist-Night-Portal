import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser, getMyProfile } from "../../services/getUsers"

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        spotify_link: "",
        apple_link: "",
        youtube_link: ""
    })

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!user.username || !user.password) {
            window.alert("Please make sure all required fields are filled out before submitting")
            return
        }

        const data = await registerUser(user)

        if (data.token) {
            sessionStorage.setItem("auth_token", data.token)
            const profile = await getMyProfile()
            sessionStorage.setItem("user", JSON.stringify(profile))
            navigate("/")
        } else {
            const errorMsg = data.username?.[0] || "Registration failed. Please try again."
            window.alert(errorMsg)
        }
    }

    const handleChange = (field) => (event) => {
        setUser({ ...user, [field]: event.target.value })
    }

    return (
        <main className="form-container-signin">
            <section>
                <form>
                    <h2 className="form-title">Welcome New Artist</h2>
                    <div className="form-subtitle-register">Username *</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="text"
                            value={user.username}
                            onChange={handleChange("username")}
                            placeholder="Username"
                            required
                            autoFocus />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">First Name</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="text"
                            value={user.first_name}
                            onChange={handleChange("first_name")}
                            placeholder="First Name" />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">Last Name</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="text"
                            value={user.last_name}
                            onChange={handleChange("last_name")}
                            placeholder="Last Name" />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">Email</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="email"
                            value={user.email}
                            onChange={handleChange("email")}
                            placeholder="Email Address" />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">Password *</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="password"
                            value={user.password}
                            onChange={handleChange("password")}
                            placeholder="Password"
                            required />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">Spotify</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="url"
                            value={user.spotify_link}
                            onChange={handleChange("spotify_link")}
                            placeholder="Spotify Link" />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">Apple Music</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="url"
                            value={user.apple_link}
                            onChange={handleChange("apple_link")}
                            placeholder="Apple Music Link" />
                        </div>
                    </fieldset>
                    <div className="form-subtitle-register">YouTube</div>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="url"
                            value={user.youtube_link}
                            onChange={handleChange("youtube_link")}
                            placeholder="YouTube Link" />
                        </div>
                    </fieldset>
                </form>
            </section>
            <section>
                <div>
                    <button className="btn" onClick={handleRegister}>Register</button>
                </div>
            </section>
            <div className="form-subtitle">Have an account? <Link to={"/login"}>Login!</Link></div>
        </main>
    )
}
