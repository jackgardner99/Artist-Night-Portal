const authHeader = () => ({
    "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
})

export const getMyCharts = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/charts", {
        headers: authHeader()
    })
    const charts = await res.json()
    return charts.filter(chart => chart.uploaded_by === user?.username)
}

export const deleteChart = async (id) => {
    return fetch(`https://artist-night-portal-api-production.up.railway.app/charts/${id}`, {
        method: "DELETE",
        headers: authHeader()
    })
}

export const uploadChart = async (imageFile) => {
    const formData = new FormData()
    formData.append("chart_file", imageFile)

    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/charts", {
        method: "POST",
        headers: authHeader(),
        body: formData
    })
    return res.json()
}
