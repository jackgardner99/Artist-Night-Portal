import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMyCharts, uploadChart } from "../../services/getCharts"
import { uploadLyrics } from "../../services/getLyrics"
import { getMySignupEntry, uploadToSignupSheet, updateSignupEntry } from "../../services/getSignupSheet"

export const SignUp = ({ user }) => {
    const [myEntry, setMyEntry] = useState(null)
    const [myCharts, setMyCharts] = useState([])
    const [selectedChartId, setSelectedChartId] = useState(null)
    const [chartFile, setChartFile] = useState(null)
    const [lyricsFile, setLyricsFile] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getMyCharts().then(setMyCharts)
        getMySignupEntry().then(setMyEntry)
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

    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        let chartId = null
        let lyricsId = null

        if (chartFile) {
            const chart = await uploadChart(chartFile)
            if (!chart.id) {
                window.alert("Chart upload failed. Please try again.")
                setIsSubmitting(false)
                return
            }
            chartId = chart.id
        }

        if (lyricsFile) {
            const lyrics = await uploadLyrics(lyricsFile)
            if (!lyrics.id) {
                window.alert("Lyrics upload failed. Please try again.")
                setIsSubmitting(false)
                return
            }
            lyricsId = lyrics.id
        }

        const updated = await updateSignupEntry(myEntry.id, { chart: chartId, lyrics: lyricsId })

        if (!updated.id) {
            setMyEntry(null)
            setIsSubmitting(false)
            window.alert("It looks like the signup sheet was cleared. Please sign up again.")
            return
        }

        setMyEntry(updated)
        setChartFile(null)
        setLyricsFile(null)
        setIsSubmitting(false)
        window.alert("Your signup has been updated!")
    }

    if (myEntry) {
        return (
            <div className="container">
                <form className="form-container" onSubmit={handleUpdate}>
                    <h2 className="form-title">You're on the list, {user?.username}!</h2>
                    <p className="text-secondary text-center">You can add a chart or lyrics to your signup below.</p>

                    {!myEntry.chart_file && (
                        <div className="form-group">
                            <label className="form-label">Add a Chart</label>
                            <div className="chart-upload-area" onClick={() => document.getElementById("update-chart-input").click()}>
                                <input
                                    id="update-chart-input"
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleChartFileChange}
                                />
                                {chartFile
                                    ? <p className="text-accent">{chartFile.name}</p>
                                    : <p className="text-muted">Click to select a chart (.pdf, .png, .jpg)</p>
                                }
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Add Lyrics</label>
                        <div className="chart-upload-area" onClick={() => document.getElementById("update-lyrics-input").click()}>
                            <input
                                id="update-lyrics-input"
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

                    <button
                        className="btn btn-full"
                        type="submit"
                        disabled={isSubmitting || (!chartFile && !lyricsFile)}
                    >
                        {isSubmitting ? "Updating..." : "Update Signup"}
                    </button>
                </form>
            </div>
        )
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
