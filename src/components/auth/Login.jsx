import { useState } from "react"
import { loginUser, getMyProfile } from "../../services/getUsers"
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!username || !password) {
            window.alert("Please make sure all fields are filled out before signing in")
            return
        }

        const data = await loginUser({ username, password })

        if (data.token) {
            localStorage.setItem("auth_token", data.token)
            const profile = await getMyProfile()
            localStorage.setItem("user", JSON.stringify(profile))
            navigate("/")
        } else {
            window.alert("Username and/or password is incorrect! Please try again.")
        }
    }

    return (
        <main className="form-container-signin">
            <section>
                <form>
                    <h2 className="form-title">Artist Night Sign In</h2>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(event) => {setUsername(event.target.value)}}
                            placeholder="Username"
                            required
                            autoFocus/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div>
                            <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}
                            placeholder="Password"
                            required
                             />
                        </div>
                    </fieldset>
                </form>
            </section>
            <section>
                <div>
                    <button className="btn" onClick={handleLogin}>Sign In</button>
                </div>
            </section>
            <div className="form-subtitle">New to Artist Night? <Link to={"/register"}>Register!</Link></div>
        </main>
    )
}
