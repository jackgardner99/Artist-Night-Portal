export const getSignupSheet = () => {
    return fetch("http://localhost:3000/signupSheet?_expand=user").then(res => res.json())
}

export const uploadToSignupSheet = (signup) => {
    return fetch("http://localhost:3000/signupSheet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signup)
    })
}

export const deleteFromSignupSheet = (id) => {
    return fetch(`http://localhost:3000/signupSheet/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}