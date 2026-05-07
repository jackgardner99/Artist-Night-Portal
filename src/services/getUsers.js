export const loginUser = (credentials) => {
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(res => res.json())
}

export const registerUser = (userData) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }).then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8000/profile/${id}`).then(res => res.json())
}

export const updateUser = (user) => {
    return fetch("http://localhost:8000/profile/me", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}