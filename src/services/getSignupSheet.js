export const getSignupSheet = () => {
    return fetch("http://localhost:8000/signup-sheet").then(res => res.json())
}

export const uploadToSignupSheet = (signup) => {
    return fetch("http://localhost:8000/signup-sheet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signup)
    })
}

export const deleteFromSignupSheet = (id) => {
    return fetch(`http://localhost:8000/signup-sheet/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}