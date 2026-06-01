const authHeader = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`
})

export const getMyCharts = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const res = await fetch("http://localhost:8000/charts", {
        headers: authHeader()
    })
    const charts = await res.json()
    return charts.filter(chart => chart.uploaded_by === user?.username)
}

export const deleteChart = async (id) => {
    return fetch(`http://localhost:8000/charts/${id}`, {
        method: "DELETE",
        headers: authHeader()
    })
}

export const uploadChart = async (imageFile) => {
    const formData = new FormData()
    formData.append("chart_file", imageFile)

    const res = await fetch("http://localhost:8000/charts", {
        method: "POST",
        headers: authHeader(),
        body: formData
    })
    return res.json()
}
