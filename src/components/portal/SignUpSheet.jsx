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
        if (!window.confirm("Are you sure you want to clear the entire signup sheet? This cannot be undone.")) return
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

    const handleLyricsClick = (signup) => {
        window.open(signup.lyrics_file, "_blank")
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
                                <div>
                                    {signup.user_image
                                        ? <img className="profile-avatar" src={signup.user_image} alt={signup.username} />
                                        : ""
                                    }
                                </div>
                                <div className="signup-name">{signup.first_name} {signup.last_name}</div>
                            </div>
                            <div className="chart-thumbnail" onClick={() => signup.chart_file && handleChartClick(signup)}>
                                {!signup.chart_file
                                    ? ""
                                    : signup.chart_file.toLowerCase().endsWith(".pdf")
                                        ? <div className="chart-pdf-badge">Chart</div>
                                        : <img className="chart-preview" src={signup.chart_file} alt={`${signup.username}'s chart`} />
                                }
                            </div>
                            <div className="chart-thumbnail" onClick={() => signup.lyrics_file && handleLyricsClick(signup)}>
                                {signup.lyrics_file
                                    ? <div className="chart-pdf-badge">Lyrics</div>
                                    : ""
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
