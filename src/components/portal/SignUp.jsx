
import { Link } from "react-router-dom"
import { uploadToSignupSheet } from "../../services/getSignupSheet"

export const SignUp = ({ artist }) => {
    const handleSignup = () => {
        const signup = {
            userId: artist.id
        }

        uploadToSignupSheet(signup)
        window.alert("Thank you for signing up for Artist Night! You are now on the signup list.")
    }

    return (
        <form>
            <h2>Welcome!</h2>
            <div>Please upload a chart for the Band when you signup</div>
            {/* <div>
                <input type="image" />
            </div> */}
            <div>
                <Link to={"/"}>
                    <button onClick={handleSignup}>Submit</button>
                </Link>
            </div>
        </form>
    )
}