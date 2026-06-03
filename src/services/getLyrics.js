const authHeader = () => ({
    "Authorization": `Token ${sessionStorage.getItem("auth_token")}`
})

export const uploadLyrics = async (lyricsFile) => {
    const formData = new FormData()
    formData.append("lyrics_file", lyricsFile)

    const res = await fetch("https://artist-night-portal-api-production.up.railway.app/lyrics", {
        method: "POST",
        headers: authHeader(),
        body: formData
    })
    return res.json()
}
