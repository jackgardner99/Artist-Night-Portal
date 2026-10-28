import { SOCIAL_LINKS } from "../components/profile/socialLinks"

export const loginUser = async (credentials) => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return res.json()
}

export const registerUser = async (userData) => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    return res.json()
}

export const getMyProfile = async () => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/profiles/me", {
        headers: {
            "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
        }
    })
    return res.json()
}

export const getUsers = async () => {
    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/profiles", {
        headers: {
            "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
        }
    })
    return res.json()
}

export const getUserById = async (id) => {
    const res = await fetch(`https://artist-night-portal-api-production.up.railway.app/profiles/${id}`, {
        headers: {
            "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
        }
    })
    return res.json()
}

export const deleteAccount = async () => {
    return fetch("https://artist-night-portal-api-production.up.railway.app/profiles/me", {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
        }
    })
}

export const updateUser = async (user, imageFile = null) => {
    const formData = new FormData()
    if (user.first_name) formData.append("first_name", user.first_name)
    if (user.last_name) formData.append("last_name", user.last_name)
    SOCIAL_LINKS.forEach(({ field }) => {
        if (user.utilities?.[field] !== undefined) formData.append(field, user.utilities[field])
    })
    if (user.utilities?.marketing_opt_in !== undefined) formData.append("marketing_opt_in", user.utilities.marketing_opt_in ? "true" : "false")
    if (imageFile) formData.append("user_image", imageFile)

    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/profiles/me", {
        method: "PUT",
        headers: {
            "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
        },
        body: formData
    })
    if (!res.ok) {
        const error = new Error(`Profile update failed (${res.status})`)
        // 400s carry per-field messages, e.g. { instagram_link: ["Enter a valid URL."] }
        if (res.status === 400) error.fieldErrors = await res.json().catch(() => null)
        throw error
    }
    return res.json()
}
