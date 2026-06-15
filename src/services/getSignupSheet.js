const authHeader = () => ({
    "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
})

export const getSignupSheet = async () => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/signup-sheet", {
        headers: authHeader()
    })
    return res.json()
}

export const getMySignupEntry = async () => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/signup-sheet/mine", {
        headers: authHeader()
    })
    const data = await res.json()
    return data?.id ? data : null
}

export const uploadToSignupSheet = async ({ chart, lyrics } = {}) => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/signup-sheet", {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...(chart && { chart }), ...(lyrics && { lyrics }) })
    })
    return res.json()
}

export const updateSignupEntry = async (id, { chart, lyrics } = {}) => {
    const res = await fetch(`https://artist-night-portal-api-production.up.railway.app/signup-sheet/${id}`, {
        method: "PATCH",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...(chart && { chart }), ...(lyrics && { lyrics }) })
    })
    return res.json()
}

export const markSignupCompleted = async (id) => {
    const res = await fetch(`https://artist-night-portal-api-production.up.railway.app/signup-sheet/${id}`, {
        method: "PATCH",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: true })
    })
    return res.json()
}

export const clearSignupSheet = async () => {
    return fetch("https://artist-night-portal-api-production.up.railway.app/signup-sheet/clear", {
        method: "DELETE",
        headers: authHeader()
    })
}

export const deleteFromSignupSheet = async (id) => {
    return fetch(`https://artist-night-portal-api-production.up.railway.app/signup-sheet/${id}`, {
        method: "DELETE",
        headers: authHeader()
    })
}

export const guestSignup = async ({ firstName, lastName, chartFile, lyricsFile }) => {
    const formData = new FormData()
    formData.append("first_name", firstName)
    if (lastName) formData.append("last_name", lastName)
    if (chartFile) formData.append("chart_file", chartFile)
    if (lyricsFile) formData.append("lyrics_file", lyricsFile)

    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/guest-signup", {
        method: "POST",
        body: formData
    })
    return res.json()
}
