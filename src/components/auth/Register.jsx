import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser, getUserByEmailAndPassword } from "../../services/getUsers"

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
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
        if (user.name && user.email) {
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
            <main>
                <section>
                    <form>
                        <h2>Artist Night Sign UP</h2>
                        <fieldset>
                            <div>
                                <input type="text"
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
                        <fieldset>
                            <div>
                                <input 
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
                        <fieldset>
                            <div>
                                <input 
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
                    </form>
                </section>
                <section>
                    <div>
                        <button onClick={handleRegister}>Sign In</button>
                    </div>
                </section>
                <div>Have an account? <Link to={"/login"}>Login!</Link></div>
            </main>
        )
}