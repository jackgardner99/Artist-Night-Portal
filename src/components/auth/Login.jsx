import { useState } from "react"
import { getUserByEmailAndPassword } from "../../services/getUsers"
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const handleLogin = () => {
        getUserByEmailAndPassword(email, password).then((foundUser) => {
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
            } else {
                window.alert("Username and/or password is incorrect! Please try again.")
            }
        })
    }

    return (
        <main>
            <section>
                <form>
                    <h1>Welcome Artist!</h1>
                    <h2>Artist Sign In</h2>
                    <fieldset>
                        <div>
                            <input 
                            type="email" 
                            value={email} 
                            onChange={(event) => {setEmail(event.target.value)}}
                            placeholder="Email Address"
                            required
                            autoFocus/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div>
                            <input 
                            type="password"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}
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
                    <button onClick={handleLogin}>Sign In</button>
                </div>
            </section>
            <div>New to Artist Night? <Link to={"/register"}>Register!</Link></div>
        </main>
    )
}