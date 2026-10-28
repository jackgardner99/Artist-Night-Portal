import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSignupSheet, markSignupCompleted, clearSignupSheet } from "../../services/getSignupSheet"
import { RecordBadge } from "../profile/RecordBadge"

// e.g. 10/11/2026 7:30 PM, in the viewer's local time
const formatSignupTime = (iso) => {
    const date = new Date(iso)
    const day = date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
    const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    return `${day} ${time}`
}

// Not-yet-played first, then completed; each group in signup order
const sortSignups = (signups) =>
    [...signups].sort((a, b) =>
        Number(a.completed) - Number(b.completed)
        || new Date(a.signed_up_at) - new Date(b.signed_up_at)
    )

export const SignUpSheet = () => {
    const [signupSheet, setSignupSheet] = useState([])
    const [showCharts, setShowCharts] = useState(true)
    const [showLyrics, setShowLyrics] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getSignupSheet().then((data) => setSignupSheet(sortSignups(data)))
    }, [])

    const handleClearSheet = () => {
        if (!window.confirm("Are you sure you want to clear the entire signup sheet? This cannot be undone.")) return
        clearSignupSheet().then(() => setSignupSheet([]))
    }

    const handleCompleted = (signupId) => {
        markSignupCompleted(signupId).then(() => {
            getSignupSheet().then((data) => setSignupSheet(sortSignups(data)))
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
            <div className="signup-filter">
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={showCharts}
                        onChange={(e) => setShowCharts(e.target.checked)}
                    />
                    Charts
                </label>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={showLyrics}
                        onChange={(e) => setShowLyrics(e.target.checked)}
                    />
                    Lyrics
                </label>
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
                                <RecordBadge compact count={signup.signup_count ?? 0} />
                                {signup.signed_up_at && (
                                    <div className="signup-meta">{formatSignupTime(signup.signed_up_at)}</div>
                                )}
                            </div>
                            {showCharts && (
                                <div className="chart-thumbnail" onClick={() => signup.chart_file && handleChartClick(signup)}>
                                    {!signup.chart_file
                                        ? ""
                                        : signup.chart_file.toLowerCase().endsWith(".pdf")
                                            ? <div className="chart-pdf-badge">Chart</div>
                                            : <img className="chart-preview" src={signup.chart_file} alt={`${signup.username}'s chart`} />
                                    }
                                </div>
                            )}
                            {showLyrics && (
                                <div className="chart-thumbnail" onClick={() => signup.lyrics_file && handleLyricsClick(signup)}>
                                    {signup.lyrics_file
                                        ? <div className="chart-pdf-badge">Lyrics</div>
                                        : ""
                                    }
                                </div>
                            )}
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
