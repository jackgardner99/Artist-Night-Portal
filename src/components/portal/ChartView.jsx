import { useLocation, useNavigate } from "react-router-dom"

export const ChartView = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { chartUrl, username } = state || {}

    const isPdf = chartUrl?.toLowerCase().endsWith(".pdf")

    return (
        <div className="container">
            <div className="flex-between mt-md mb-md">
                <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>← Back</button>
                <h2>{username}'s Chart</h2>
            </div>
            <div className="chart-fullscreen">
                {isPdf
                    ? <iframe src={chartUrl} title={`${username}'s chart`} />
                    : <img src={chartUrl} alt={`${username}'s chart`} />
                }
            </div>
        </div>
    )
}
