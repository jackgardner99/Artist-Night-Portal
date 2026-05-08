import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSignupSheet, markSignupCompleted, clearSignupSheet } from "../../services/getSignupSheet"

export const SignUpSheet = () => {
    const [signupSheet, setSignupSheet] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSignupSheet().then(setSignupSheet)
    }, [])

    const handleClearSheet = () => {
        clearSignupSheet().then(() => setSignupSheet([]))
    }

    const handleCompleted = (signupId) => {
        markSignupCompleted(signupId).then(() => {
            getSignupSheet().then(setSignupSheet)
        })
    }

    const handleChartClick = (signup) => {
        const isPdf = signup.chart_file?.toLowerCase().endsWith(".pdf")
        if (isPdf) {
            window.open(signup.chart_file, "_blank")
        } else {
            navigate("/chart-view", { state: { chartUrl: signup.chart_file, username: signup.username } })
        }
    }

    return (
        <main className="container">
            <div className="signup-list-header">
                <h2>Signup Sheet</h2>
                <button className="btn btn-danger" onClick={handleClearSheet}>Clear Sheet</button>
            </div>
            <div className="signup-list">
                {signupSheet.map((signup) => {
                    return (
                        <div key={signup.id} className="signup-item">
                            <div className="signup-info">
                                <div className="signup-name">{signup.username}</div>
                            </div>
                            <div className="chart-thumbnail" onClick={() => signup.chart_file && handleChartClick(signup)}>
                                {!signup.chart_file
                                    ? ""
                                    : signup.chart_file.toLowerCase().endsWith(".pdf")
                                        ? <div className="chart-pdf-badge">PDF</div>
                                        : <img className="chart-preview" src={signup.chart_file} alt={`${signup.username}'s chart`} />
                                }
                            </div>
                            <div>
                                <button
                                    className="btn btn-sm"
                                    onClick={() => handleCompleted(signup.id)}
                                    disabled={signup.completed}
                                >
                                    {signup.completed ? "Completed" : "Mark Complete"}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
