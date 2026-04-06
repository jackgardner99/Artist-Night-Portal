import { useEffect, useState } from "react"
import { deleteFromSignupSheet, getSignupSheet } from "../../services/getSignupSheet"

export const SignUpSheet = ({ bandmember }) => {
    const [signupSheet, setSignupSheet] = useState([])

    useEffect(() => {
        getSignupSheet().then(setSignupSheet)
    }, [bandmember])

    const handleDeleteFromSignupSheet = (signupId) => {
        deleteFromSignupSheet(signupId).then(() => {
            getSignupSheet().then(setSignupSheet)
        })
    }

    return (
        <main className="container">
            <div className="signup-list-header">
                <h2>Signup Sheet</h2>
            </div>
            <div className="signup-list">
                {signupSheet.map((signup) => {
                    return (
                        <div className="signup-item">
                            <div className="signup-name">{signup.user?.name}</div>
                            <div>
                                <button onClick={() => {
                                    handleDeleteFromSignupSheet(signup.id)
                                }}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}