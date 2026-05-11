export const loginUser = async (credentials) => {
    const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return res.json()
}

export const registerUser = async (userData) => {
    const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    return res.json()
}

export const getMyProfile = async () => {
    const res = await fetch("http://localhost:8000/profiles/me", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    return res.json()
}

export const getUsers = async () => {
    const res = await fetch("http://localhost:8000/profiles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    return res.json()
}

export const getUserById = async (id) => {
    const res = await fetch(`http://localhost:8000/profiles/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    return res.json()
}

export const updateUser = async (user, imageFile = null) => {
    const formData = new FormData()
    if (user.first_name) formData.append("first_name", user.first_name)
    if (user.last_name) formData.append("last_name", user.last_name)
    if (user.utilities?.spotify_link !== undefined) formData.append("spotify_link", user.utilities.spotify_link)
    if (user.utilities?.apple_link !== undefined) formData.append("apple_link", user.utilities.apple_link)
    if (user.utilities?.youtube_link !== undefined) formData.append("youtube_link", user.utilities.youtube_link)
    if (imageFile) formData.append("user_image", imageFile)

    const res = await fetch("http://localhost:8000/profiles/me", {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: formData
    })
    return res.json()
}
