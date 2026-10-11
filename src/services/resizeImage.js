// Shrinks a photo in the browser before upload so phone pictures (often several MB,
// sometimes HEIC) upload quickly as a small JPEG. Falls back to the original file
// if the browser can't decode it.
export const resizeImage = (file, maxSize = 800, quality = 0.85) => {
    return new Promise((resolve) => {
        const url = URL.createObjectURL(file)
        const img = new Image()

        img.onload = () => {
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
            const canvas = document.createElement("canvas")
            canvas.width = Math.round(img.width * scale)
            canvas.height = Math.round(img.height * scale)
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height)
            URL.revokeObjectURL(url)

            canvas.toBlob((blob) => {
                if (!blob) return resolve(file)
                const name = file.name.replace(/\.[^.]+$/, "") + ".jpg"
                resolve(new File([blob], name, { type: "image/jpeg" }))
            }, "image/jpeg", quality)
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            resolve(file)
        }

        img.src = url
    })
}
