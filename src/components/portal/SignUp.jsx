import { Link } from "react-router-dom"

export const SignUp = () => {
    

    return (
        <form>
            <h2>Welcome!</h2>
            <div>Please upload a chart for the Band when you signup</div>
            {/* <div>
                <input type="image" />
            </div> */}
            <div>
                <Link to={"/"}>
                    <button>Submit</button>
                </Link>
            </div>
        </form>
    )
}