import { Link } from "react-router-dom"

export const Portal = () => {
    return (
        <div>
            <div>
                <h1>Artist Night Portal</h1>
            </div>
            <div>
                <button>Sign Up</button>
            </div>
            <div>
                Need to book the studio? 
                <Link to={"https://www.bluehousebandofficial.com/studio"}><div>Blue House Studio</div></Link>
            </div>
        </div>
    )
}