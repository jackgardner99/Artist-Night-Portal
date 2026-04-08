import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser, getUserByEmailAndPassword } from "../../services/getUsers"

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        isBand: false,
        spotifyLink: "",
        appleMusicLink: "",
        youtubeLink: "",
        isHere: false
    })

    const navigate = useNavigate()

    const navigateToUsersPage = () => {
        getUserByEmailAndPassword(user.email, user.password).then((foundUser) => {
            if (foundUser.length === 1) {
                if (foundUser[0].isBand === true) {
                    const bandMember = foundUser[0]
                    localStorage.setItem(
                        "bandmember",
                        JSON.stringify({
                            id: bandMember.id
                        })
                    )
                    navigate("/")
                } else {
                    const artist = foundUser[0]
                    localStorage.setItem(
                        "artist",
                        JSON.stringify({
                            id: artist.id
                        })
                    )
                    navigate("/")
                }
            }
        })        
    }

    const registerNewUser = () => {
        createUser(user).then(navigateToUsersPage)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (user.name && user.email && user.password) {
            getUserByEmailAndPassword(user.email, user.password).then((response) => {
            if (response.length > 0) {
                window.alert("Email and/or password is already in use. Please provide another email and/or password.")
            } else {
                registerNewUser()
            }
        })
        } else {
            window.alert('Please make sure all input fields are filled out before submitting')
        }
    }


    return (
            <main className="form-container-signin">
                <section>
                    <form>
                        <h2 className="form-title">Welcome New Artist</h2>
                        <div className="form-subtitle-register">Name *</div>
                        <fieldset>
                            <div>
                                <input
                                className="form-input"
                                type="text"
                                onChange={(event) => {
                                    const copy = {...user}
                                    copy.name = event.target.value
                                    setUser(copy)
                                }}
                                placeholder="Artist Name"
                                required
                                autoFocus />
                            </div>
                        </fieldset>
                        <div className="form-subtitle-register">Email *</div>
                        <fieldset>
                            <div>
                                <input 
                                className="form-input"
                                type="email" 
                                onChange={(event) => {
                                    const copy = {...user}
                                    copy.email = event.target.value
                                    setUser(copy)
                                }}
                                placeholder="Email Address"
                                required
                                autoFocus/>
                            </div>
                        </fieldset>
                        <div className="form-subtitle-register">Password *</div>
                        <fieldset>
                            <div>
                                <input
                                className="form-input" 
                                type="password"
                                onChange={(event) => {
                                    const copy = {...user}
                                    copy.password = event.target.value
                                    setUser(copy)
                                }}
                                placeholder="Password"
                                required
                                autoFocus
                                 />
                            </div>
                        </fieldset>
                        <div className="form-subtitle-register">Spotify</div>
                        <fieldset>
                            <div>
                                <input 
                                className="form-input"
                                type="url"
                                onChange={(event) => {
                                    const copy = {...user}
                                    copy.spotifyLink = event.target.value
                                    setUser(copy)
                                }}
                                placeholder="Spotify Link"
                                autoFocus
                                 />
                            </div>
                        </fieldset>
                        <div className="form-subtitle-register">Apple Music</div>
                        <fieldset>
                            <div>
                                <input 
                                className="form-input"
                                type="url"
                                onChange={(event) => {
                                    const copy = {...user}
                                    copy.appleMusicLink = event.target.value
                                    setUser(copy)
                                }}
                                placeholder="Apple Music Link"
                                autoFocus
                                 />
                            </div>
                        </fieldset>
                        <div className="form-subtitle-register">YouTube</div>
                        <fieldset>
                            <div>
                                <input 
                                className="form-input"
                                type="url"
                                onChange={(event) => {
                                    const copy = {...user}
                                    copy.youtubeLink = event.target.value
                                    setUser(copy)
                                }}
                                placeholder="YouTube Link"
                                autoFocus
                                 />
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