import { useEffect, useState } from "react"
import { getSignupSheet } from "../../services/getSignupSheet"

export const SignUpSheet = ({ bandmember }) => {
    const [signupSheet, setSignupSheet] = useState([])

    useEffect(() => {
        getSignupSheet().then(setSignupSheet)
    }, [bandmember])

    return (
        <main>
            <div>
                <h2>Signup Sheet</h2>
            </div>
            <div>
                {signupSheet.map((signup) => {
                    return (
                        <div>
                            <div>{signup.user?.name}</div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}