import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { guestSignup } from "../../services/getSignupSheet"

export const GuestSignup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [chartFile, setChartFile] = useState(null)
    const [lyricsFile, setLyricsFile] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!firstName.trim()) {
            window.alert("Please enter your first name.")
            return
        }
        setIsSubmitting(true)

        const result = await guestSignup({ firstName, lastName, chartFile, lyricsFile })

        if (!result.id) {
            window.alert("Something went wrong. Please try again.")
            setIsSubmitting(false)
            return
        }

        window.alert(`You're on the list, ${firstName}! See you at Artist Night.`)
        navigate("/login")
    }

    return (
        <main className="form-container-signin">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Artist Night Sign Up</h2>
                <p className="text-secondary text-center" style={{ marginBottom: "1rem" }}>
                    No account needed — just your name.
                </p>

                <div className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Last Name (optional)"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Chart <span className="text-muted">(optional)</span></label>
                    <div className="chart-upload-area" onClick={() => document.getElementById("guest-chart-input").click()}>
                        <input
                            id="guest-chart-input"
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => setChartFile(e.target.files[0])}
                        />
                        {chartFile
                            ? <p className="text-accent">{chartFile.name}</p>
                            : <p className="text-muted">Click to select a chart (.pdf, .png, .jpg)</p>
                        }
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Lyrics <span className="text-muted">(optional)</span></label>
                    <div className="chart-upload-area" onClick={() => document.getElementById("guest-lyrics-input").click()}>
                        <input
                            id="guest-lyrics-input"
                            type="file"
                            accept=".pdf,.txt,.doc,.docx"
                            onChange={(e) => setLyricsFile(e.target.files[0])}
                        />
                        {lyricsFile
                            ? <p className="text-accent">{lyricsFile.name}</p>
                            : <p className="text-muted">Click to select lyrics (.pdf, .txt, .doc)</p>
                        }
                    </div>
                </div>

                <button className="btn btn-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up for Artist Night"}
                </button>
            </form>

            <div className="form-subtitle">
                Have an account? <Link to="/login">Sign in</Link>
            </div>
        </main>
    )
}
