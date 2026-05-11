const authHeader = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`
})

export const getSignupSheet = async () => {
    const res = await fetch("http://localhost:8000/signup-sheet", {
        headers: authHeader()
    })
    return res.json()
}

export const uploadToSignupSheet = async ({ chart, lyrics } = {}) => {
    const res = await fetch("http://localhost:8000/signup-sheet", {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...(chart && { chart }), ...(lyrics && { lyrics }) })
    })
    return res.json()
}

export const markSignupCompleted = async (id) => {
    const res = await fetch(`http://localhost:8000/signup-sheet/${id}`, {
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
    return fetch("http://localhost:8000/signup-sheet/clear", {
        method: "DELETE",
        headers: authHeader()
    })
}

export const deleteFromSignupSheet = async (id) => {
    return fetch(`http://localhost:8000/signup-sheet/${id}`, {
        method: "DELETE",
        headers: authHeader()
    })
}
