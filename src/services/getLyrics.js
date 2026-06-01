const authHeader = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`
})

export const uploadLyrics = async (lyricsFile) => {
    const formData = new FormData()
    formData.append("lyrics_file", lyricsFile)

    const res = await fetch("http://localhost:8000/lyrics", {
        method: "POST",
        headers: authHeader(),
        body: formData
    })
    return res.json()
}
