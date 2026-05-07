const authHeader = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`
})

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
