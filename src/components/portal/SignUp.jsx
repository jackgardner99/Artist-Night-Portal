import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { uploadChart } from "../../services/getCharts"
import { uploadToSignupSheet } from "../../services/getSignupSheet"

export const SignUp = ({ user }) => {
    const [chartFile, setChartFile] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!chartFile) {
            window.alert("Please upload a chart before signing up.")
            return
        }

        setIsSubmitting(true)

        const chart = await uploadChart(chartFile)

        if (!chart.id) {
            window.alert("Chart upload failed. Please try again.")
            setIsSubmitting(false)
            return
        }

        await uploadToSignupSheet(chart.id)
        window.alert("Thank you for signing up for Artist Night! You are now on the signup list.")
        navigate("/")
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSignup}>
                <h2 className="form-title">Welcome, {user?.username}!</h2>
                <p>Please upload a chart for the Band when you signup</p>
                <div className="chart-upload-area" onClick={() => document.getElementById("chart-input").click()}>
                    <input
                        id="chart-input"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => setChartFile(e.target.files[0])}
                    />
                    {chartFile
                        ? <p className="text-accent">{chartFile.name}</p>
                        : <p className="text-muted">Click to select a chart image</p>
                    }
                </div>
                <button className="btn btn-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}
