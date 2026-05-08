import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMyCharts, uploadChart } from "../../services/getCharts"
import { uploadLyrics } from "../../services/getLyrics"
import { uploadToSignupSheet } from "../../services/getSignupSheet"

export const SignUp = ({ user }) => {
    const [myCharts, setMyCharts] = useState([])
    const [selectedChartId, setSelectedChartId] = useState(null)
    const [chartFile, setChartFile] = useState(null)
    const [lyricsFile, setLyricsFile] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getMyCharts().then(setMyCharts)
    }, [])

    const handleSelectChart = (id) => {
        if (selectedChartId === id) {
            setSelectedChartId(null)
        } else {
            setSelectedChartId(id)
            setChartFile(null)
        }
    }

    const handleChartFileChange = (e) => {
        setChartFile(e.target.files[0])
        setSelectedChartId(null)
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        let chartId = selectedChartId

        if (!chartId && chartFile) {
            const chart = await uploadChart(chartFile)
            if (!chart.id) {
                window.alert("Chart upload failed. Please try again.")
                setIsSubmitting(false)
                return
            }
            chartId = chart.id
        }

        let lyricsId = null
        if (lyricsFile) {
            const lyrics = await uploadLyrics(lyricsFile)
            if (!lyrics.id) {
                window.alert("Lyrics upload failed. Please try again.")
                setIsSubmitting(false)
                return
            }
            lyricsId = lyrics.id
        }

        await uploadToSignupSheet({ chart: chartId, lyrics: lyricsId })
        window.alert("Thank you for signing up for Artist Night! You are now on the signup list.")
        navigate("/")
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSignup}>
                <h2 className="form-title">Welcome, {user?.username}!</h2>

                {myCharts.length > 0 && (
                    <div className="form-group">
                        <label className="form-label">Your Existing Charts</label>
                        <div className="existing-charts">
                            {myCharts.map((chart) => {
                                const isPdf = chart.chart_file?.toLowerCase().endsWith(".pdf")
                                const fileName = chart.chart_file?.split("/").pop()
                                const isSelected = selectedChartId === chart.id
                                return (
                                    <div
                                        key={chart.id}
                                        className={`existing-chart-item${isSelected ? " selected" : ""}`}
                                        onClick={() => handleSelectChart(chart.id)}
                                    >
                                        {isPdf
                                            ? <div className="chart-pdf-badge">PDF</div>
                                            : <img src={chart.chart_file} alt={fileName} />
                                        }
                                        <span className="text-sm">{fileName}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">
                        {myCharts.length > 0 ? "Or Upload a New Chart" : "Chart"}
                        <span className="text-muted"> (optional)</span>
                    </label>
                    <div
                        className={`chart-upload-area${selectedChartId ? " disabled" : ""}`}
                        onClick={() => !selectedChartId && document.getElementById("chart-input").click()}
                    >
                        <input
                            id="chart-input"
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleChartFileChange}
                            disabled={!!selectedChartId}
                        />
                        {chartFile
                            ? <p className="text-accent">{chartFile.name}</p>
                            : selectedChartId
                                ? <p className="text-muted">Deselect existing chart to upload a new one</p>
                                : <p className="text-muted">Click to select a chart (.pdf, .png, .jpg)</p>
                        }
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Lyrics <span className="text-muted">(optional)</span></label>
                    <div className="chart-upload-area" onClick={() => document.getElementById("lyrics-input").click()}>
                        <input
                            id="lyrics-input"
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
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
            </form>
        </div>
    )
}
